'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { getCurrentUser } from '@/lib/auth';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

export interface UploadResult {
  url?: string;
  error?: string;
}

export async function uploadImageAction(formData: FormData): Promise<UploadResult> {
  const user = await getCurrentUser();
  if (!user) return { error: '로그인이 필요합니다.' };

  const file = formData.get('file');
  if (!(file instanceof File)) return { error: '파일이 첨부되지 않았습니다.' };
  if (!ALLOWED.has(file.type)) return { error: 'JPG/PNG/WEBP/GIF만 업로드 가능합니다.' };
  if (file.size > MAX_BYTES) return { error: '5MB 이하의 이미지만 업로드 가능합니다.' };

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const ext = path.extname(file.name) || '.png';
  const safeExt = ext.toLowerCase().replace(/[^a-z0-9.]/g, '');
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${safeExt}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, name), buffer);

  return { url: `/uploads/${name}` };
}
