import { promises as fs } from 'fs';
import path from 'path';

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_RW_TOKEN;
const BLOB_BASE = 'https://blob.vercel-storage.com';

const DATA_DIR = path.join(process.cwd(), '.data');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const PROCESSED_DIR = path.join(DATA_DIR, 'processed');

async function ensureDirs() {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  await fs.mkdir(PROCESSED_DIR, { recursive: true });
}

function extFromType(type?: string, fallback = 'png') {
  if (!type) return fallback;
  if (type.includes('jpeg') || type.includes('jpg')) return 'jpg';
  if (type.includes('png')) return 'png';
  if (type.includes('webp')) return 'webp';
  if (type.includes('gif')) return 'gif';
  if (type.includes('heic') || type.includes('heif')) return 'heic';
  return fallback;
}

export async function saveUpload(
  id: string,
  ext: string,
  bytes: Uint8Array,
  contentType?: string,
): Promise<{ url: string; path: string; key?: string }> {
  if (BLOB_TOKEN) {
    const key = `pets/uploads/${id}.${ext}`;
    const res = await fetch(`${BLOB_BASE}/${key}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${BLOB_TOKEN}`,
        'Content-Type': contentType || 'application/octet-stream',
        'x-vercel-filename': `${id}.${ext}`,
      },
      body: bytes,
    });
    if (!res.ok) {
      throw new Error(`Blob upload failed: ${res.status} ${await res.text()}`);
    }
    const data = await res.json().catch(() => ({} as any));
    const url = data.url || `${BLOB_BASE}/${key}`;
    let storedKey: string | undefined = undefined;
    try {
      storedKey = data.pathname || data.key || new URL(url).pathname.replace(/^\//, '');
    } catch {}
    return { url, path: `/${key}`, key: storedKey };
  }

  await ensureDirs();
  const filePath = path.join(UPLOADS_DIR, `${id}.${ext}`);
  await fs.writeFile(filePath, bytes);
  // Served via API route (/api/pet-image?id=...)
  return { url: `/api/pet-image?id=${id}`, path: filePath };
}

export async function saveProcessed(
  id: string,
  ext: string,
  bytes: Uint8Array,
  contentType?: string,
): Promise<{ url: string; path: string; key?: string }> {
  if (BLOB_TOKEN) {
    const key = `pets/processed/${id}.${ext}`;
    const res = await fetch(`${BLOB_BASE}/${key}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${BLOB_TOKEN}`,
        'Content-Type': contentType || 'application/octet-stream',
        'x-vercel-filename': `${id}.${ext}`,
      },
      body: bytes,
    });
    if (!res.ok) {
      throw new Error(`Blob processed upload failed: ${res.status} ${await res.text()}`);
    }
    const data = await res.json().catch(() => ({} as any));
    const url = data.url || `${BLOB_BASE}/${key}`;
    let storedKey: string | undefined = undefined;
    try {
      storedKey = data.pathname || data.key || new URL(url).pathname.replace(/^\//, '');
    } catch {}
    return { url, path: `/${key}`, key: storedKey };
  }

  await ensureDirs();
  const filePath = path.join(PROCESSED_DIR, `${id}.${ext}`);
  await fs.writeFile(filePath, bytes);
  return { url: `/api/pet-image?id=${id}`, path: filePath };
}

export async function readUploadBytes(
  id: string,
  ext: string,
  keyFromMeta?: string,
  srcUrl?: string,
): Promise<Uint8Array> {
  // 1) If a public src URL is available, try it first (works regardless of token)
  if (srcUrl) {
    try {
      const res = await fetch(srcUrl);
      if (res.ok) {
        const ab = await res.arrayBuffer();
        return new Uint8Array(ab);
      }
    } catch {}
  }

  // 2) If we have a blob token, try authenticated blob paths
  if (BLOB_TOKEN) {
    const attempts: Array<{ url: string; headers?: Record<string, string> }> = [];
    if (keyFromMeta) {
      attempts.push({ url: `${BLOB_BASE}/${keyFromMeta}`, headers: { Authorization: `Bearer ${BLOB_TOKEN}` } });
    }
    attempts.push({ url: `${BLOB_BASE}/pets/uploads/${id}.${ext}`, headers: { Authorization: `Bearer ${BLOB_TOKEN}` } });

    const errors: string[] = [];
    for (const attempt of attempts) {
      try {
        const res = await fetch(attempt.url, { headers: attempt.headers });
        if (!res.ok) {
          errors.push(`${res.status} @ ${attempt.url}`);
          continue;
        }
        const ab = await res.arrayBuffer();
        return new Uint8Array(ab);
      } catch (e: any) {
        errors.push(`fetch error @ ${attempt.url}: ${e?.message || 'unknown'}`);
      }
    }
    throw new Error(`Read upload failed; tried ${errors.join('; ')}`);
  }

  // 3) Fallback to local dev storage
  await ensureDirs();
  const filePath = path.join(UPLOADS_DIR, `${id}.${ext}`);
  const buf = await fs.readFile(filePath);
  return new Uint8Array(buf);
}

export function pickExtFromFileLike(file: { name?: string; type?: string }): string {
  const byName = file.name && file.name.includes('.') ? file.name.split('.').pop() : undefined;
  return (byName as string) || extFromType(file.type);
}
