import 'server-only';
import { put, head, BlobNotFoundError } from '@vercel/blob';

const CONSULTATIONS_PATHNAME = 'consultations/all.json';

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

async function readAll(): Promise<Consultation[]> {
  try {
    const blob = await head(CONSULTATIONS_PATHNAME);
    // Read via downloadUrl, NOT url. The public `url` is served from the CDN
    // edge cache which ignores query strings, so right after an overwrite it
    // returns stale JSON for several seconds (the admin status toggle needing
    // a refresh / double-click). `downloadUrl` bypasses that cache and gives
    // strong read-after-write consistency. A nonce is added as a belt-and-
    // suspenders cache-buster.
    const sep = blob.downloadUrl.includes('?') ? '&' : '?';
    const url = `${blob.downloadUrl}${sep}t=${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    const parsed = (await res.json()) as Consultation[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    // No consultations stored yet — the blob hasn't been created.
    if (err instanceof BlobNotFoundError) return [];
    throw err;
  }
}

async function writeAll(items: Consultation[]): Promise<void> {
  await put(CONSULTATIONS_PATHNAME, JSON.stringify(items, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
  });
}

export async function getAllConsultations(): Promise<Consultation[]> {
  const items = await readAll();
  return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getConsultationById(id: string): Promise<Consultation | null> {
  const items = await readAll();
  return items.find((c) => c.id === id) ?? null;
}

export async function createConsultation(input: NewConsultationInput): Promise<Consultation> {
  const items = await readAll();
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
  items.unshift(item);
  await writeAll(items);
  return item;
}

export async function setConsultationStatus(id: string, status: ConsultationStatus): Promise<void> {
  const items = await readAll();
  const idx = items.findIndex((c) => c.id === id);
  if (idx < 0) return;
  items[idx] = {
    ...items[idx],
    status,
    handledAt: status === 'handled' ? new Date().toISOString() : undefined,
  };
  await writeAll(items);
}

export async function deleteConsultation(id: string): Promise<void> {
  const items = await readAll();
  const filtered = items.filter((c) => c.id !== id);
  await writeAll(filtered);
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
