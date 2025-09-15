import { kvGet, kvSet, type PetMeta } from './kv';
import { readUploadBytes, saveProcessed } from './storage';

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

export async function processPet(id: string, _gender?: string) {
  const meta = (await kvGet(`pet:${id}:meta`)) as PetMeta | null;
  if (!meta || !meta.ext) {
    await kvSet(`pet:${id}:status`, { state: 'error', error: 'meta not found' });
    return;
  }
  // Simulate some processing time
  await sleep(1500);
  const bytes = await readUploadBytes(id, meta.ext);
  const saved = await saveProcessed(id, meta.ext, bytes, meta.contentType);
  await kvSet(`pet:${id}:status`, { state: 'done', url: saved.url });
}

