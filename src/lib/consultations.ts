import 'server-only';
import { put, list, head, del, BlobNotFoundError } from '@vercel/blob';

// One blob per consultation. Storing every record in a single shared JSON file
// caused lost updates: the public Blob store is eventually consistent, so a new
// submission would read a stale snapshot, append itself, and overwrite — wiping
// out records written moments earlier ("submitted but not in the list"). With a
// blob per record, each submission only ever writes its own file, so concurrent
// submissions can never clobber each other.
const PREFIX = 'consultations/items/';
const pathFor = (id: string): string => `${PREFIX}${id}.json`;

export type ConsultationStatus = 'pending' | 'handled';

export interface Consultation {
  id: string;
  brand: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: ConsultationStatus;
  createdAt: string;
  handledAt?: string;
}

export type NewConsultationInput = Pick<Consultation, 'brand' | 'name' | 'phone' | 'email' | 'message'>;

const PUT_OPTS = {
  access: 'public',
  addRandomSuffix: false,
  allowOverwrite: true,
  contentType: 'application/json',
  cacheControlMaxAge: 0,
} as const;

// Fetch a blob's JSON via downloadUrl (bypasses the CDN edge cache that the
// public `url` is subject to) with a unique nonce, so reads are fresh.
async function fetchJson(downloadUrl: string): Promise<Consultation | null> {
  const sep = downloadUrl.includes('?') ? '&' : '?';
  const res = await fetch(`${downloadUrl}${sep}t=${Date.now()}-${Math.random().toString(36).slice(2)}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return (await res.json()) as Consultation;
}

export async function getAllConsultations(): Promise<Consultation[]> {
  const { blobs } = await list({ prefix: PREFIX });
  const items = await Promise.all(blobs.map((b) => fetchJson(b.downloadUrl)));
  return items
    .filter((c): c is Consultation => c !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getConsultationById(id: string): Promise<Consultation | null> {
  try {
    const blob = await head(pathFor(id));
    return await fetchJson(blob.downloadUrl);
  } catch (err) {
    if (err instanceof BlobNotFoundError) return null;
    throw err;
  }
}

export async function createConsultation(input: NewConsultationInput): Promise<Consultation> {
  const item: Consultation = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    brand: input.brand.trim(),
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email.trim().toLowerCase(),
    message: input.message.trim(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  await put(pathFor(item.id), JSON.stringify(item), PUT_OPTS);
  return item;
}

export async function setConsultationStatus(id: string, status: ConsultationStatus): Promise<void> {
  const item = await getConsultationById(id);
  if (!item) return;
  const next: Consultation = {
    ...item,
    status,
    handledAt: status === 'handled' ? new Date().toISOString() : undefined,
  };
  await put(pathFor(id), JSON.stringify(next), PUT_OPTS);
}

export async function deleteConsultation(id: string): Promise<void> {
  try {
    await del(pathFor(id));
  } catch (err) {
    if (!(err instanceof BlobNotFoundError)) throw err;
  }
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
}
