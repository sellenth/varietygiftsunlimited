import type { APIRoute } from 'astro';
export const prerender = false;
import { promises as fs } from 'fs';
import path from 'path';
import { kvGet, type PetMeta } from '../../lib/server/kv';

const DATA_DIR = path.join(process.cwd(), '.data');
const PROCESSED_DIR = path.join(DATA_DIR, 'processed');

function mimeFromExt(ext?: string) {
  switch ((ext || '').toLowerCase()) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}

export const GET: APIRoute = async ({ request }) => {
  const u = new URL(request.url);
  const id = u.searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });

  const meta = (await kvGet(`pet:${id}:meta`)) as PetMeta | null;
  const ext = meta?.ext || 'png';
  const fp = path.join(PROCESSED_DIR, `${id}.${ext}`);
  try {
    const bytes = await fs.readFile(fp);
    return new Response(bytes, { status: 200, headers: { 'Content-Type': mimeFromExt(ext), 'Cache-Control': 'public, max-age=31536000, immutable' } });
  } catch {
    return new Response('Not found', { status: 404 });
  }
};
