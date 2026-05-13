import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'consultations.json');

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

async function ensureStore(): Promise<void> {
  try {
    await fs.access(FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(FILE, '[]', 'utf-8');
  }
}

async function readAll(): Promise<Consultation[]> {
  await ensureStore();
  const raw = await fs.readFile(FILE, 'utf-8');
  return JSON.parse(raw) as Consultation[];
}

async function writeAll(items: Consultation[]): Promise<void> {
  await fs.writeFile(FILE, JSON.stringify(items, null, 2), 'utf-8');
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
