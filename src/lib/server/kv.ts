import { promises as fs } from 'fs';
import path from 'path';

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const DATA_DIR = path.join(process.cwd(), '.data');
const KV_FILE = path.join(DATA_DIR, 'kv.json');

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readKvFile(): Promise<Record<string, any>> {
  await ensureDataDir();
  try {
    const txt = await fs.readFile(KV_FILE, 'utf8');
    return JSON.parse(txt || '{}');
  } catch {
    return {};
  }
}

async function writeKvFile(data: Record<string, any>) {
  await ensureDataDir();
  await fs.writeFile(KV_FILE, JSON.stringify(data, null, 2), 'utf8');
}

async function kvGetFile(key: string): Promise<any | null> {
  const kv = await readKvFile();
  return key in kv ? kv[key] : null;
}

async function kvSetFile(key: string, value: any): Promise<void> {
  const kv = await readKvFile();
  kv[key] = value;
  await writeKvFile(kv);
}

async function kvDelFile(key: string): Promise<void> {
  const kv = await readKvFile();
  if (key in kv) {
    delete kv[key];
    await writeKvFile(kv);
  }
}

async function kvGetUpstash(key: string): Promise<any | null> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;
  const res = await fetch(`${UPSTASH_URL}/get/${encodeURIComponent(key)}` , {
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!('result' in data)) return null;
  const v = data.result;
  try {
    return typeof v === 'string' ? JSON.parse(v) : v;
  } catch {
    return v;
  }
}

async function kvSetUpstash(key: string, value: any): Promise<void> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return;
  const payload = typeof value === 'string' ? value : JSON.stringify(value);
  await fetch(`${UPSTASH_URL}/set/${encodeURIComponent(key)}/${encodeURIComponent(payload)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
    },
  });
}

async function kvDelUpstash(key: string): Promise<void> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return;
  await fetch(`${UPSTASH_URL}/del/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
    },
  });
}

export async function kvGet(key: string): Promise<any | null> {
  if (UPSTASH_URL && UPSTASH_TOKEN) {
    return kvGetUpstash(key);
  }
  return kvGetFile(key);
}

export async function kvSet(key: string, value: any): Promise<void> {
  if (UPSTASH_URL && UPSTASH_TOKEN) {
    return kvSetUpstash(key, value);
  }
  return kvSetFile(key, value);
}

export async function kvDel(key: string): Promise<void> {
  if (UPSTASH_URL && UPSTASH_TOKEN) {
    return kvDelUpstash(key);
  }
  return kvDelFile(key);
}

export type PetStatus = { state: 'uploaded' | 'processing' | 'done' | 'error'; url?: string; error?: string };
export type PetMeta = { gender?: string; src?: string; ext?: string; contentType?: string };

