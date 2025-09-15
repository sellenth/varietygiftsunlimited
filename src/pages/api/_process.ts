import type { APIRoute } from 'astro';
import { kvGet, kvSet, type PetMeta } from '../../lib/server/kv';
import { readUploadBytes, saveProcessed } from '../../lib/server/storage';

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

export const POST: APIRoute = async ({ request, url }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    let id = '';
    let gender: string | undefined;
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const body = await request.formData();
      id = (body.get('id') as string) || '';
      gender = (body.get('gender') as string) || undefined;
    } else if (contentType.includes('application/json')) {
      const j = await request.json().catch(() => ({}));
      id = j.id || '';
      gender = j.gender;
    } else {
      const u = new URL(request.url);
      id = u.searchParams.get('id') || '';
      gender = u.searchParams.get('gender') || undefined;
    }
    if (!id) return new Response('Missing id', { status: 400 });

    const meta = (await kvGet(`pet:${id}:meta`)) as PetMeta | null;
    if (!meta || !meta.ext) {
      await kvSet(`pet:${id}:status`, { state: 'error', error: 'meta not found' });
      return new Response('meta not found', { status: 404 });
    }

    // Simulate processing delay so polling can kick in.
    await sleep(1500);

    // Minimal processing: just reuse the uploaded bytes as the result.
    // In a real pipeline, you would transform or call external AI here.
    const bytes = await readUploadBytes(id, meta.ext);
    const saved = await saveProcessed(id, meta.ext, bytes, meta.contentType);

    await kvSet(`pet:${id}:status`, { state: 'done', url: saved.url });
    return new Response('ok', { status: 200 });
  } catch (err: any) {
    return new Response(`worker error: ${err?.message || 'unknown'}`, { status: 500 });
  }
};

