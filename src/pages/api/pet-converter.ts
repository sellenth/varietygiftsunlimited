import type { APIRoute } from 'astro';
export const prerender = false;
import { kvGet, kvSet, type PetStatus, type PetMeta } from '../../lib/server/kv';
import { processPet } from '../../lib/server/process';

async function triggerProcess(origin: string, id: string, gender?: string) {
  // Run processing synchronously to ensure it actually starts in serverless
  if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
    await processPet(id, gender);
    return;
  }
  // Otherwise call a background route and wait for it to complete
  const url = new URL('/api/_process', origin);
  const body = new URLSearchParams();
  body.set('id', id);
  if (gender) body.set('gender', gender);
  await fetch(url.toString(), { method: 'POST', body }).catch(() => {});
}

export const POST: APIRoute = async ({ request, url }) => {
  try {
    const form = await request.formData();
    const id = (form.get('filename') as string) || (form.get('image_id') as string);
    const gender = (form.get('gender') as string) || undefined;
    if (!id) return new Response('Missing id', { status: 400 });

    const status = (await kvGet(`pet:${id}:status`)) as PetStatus | null;
    if (status && status.state === 'done' && status.url) {
      // Return quoted path to match existing client parsing
      return new Response(JSON.stringify(status.url), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    if (status && status.state === 'error') {
      return new Response(status.error || 'processing error', { status: 500, headers: { 'Content-Type': 'text/plain' } });
    }

    // If first time or still processing, make sure a worker is triggered
    if (!status || status.state === 'uploaded' || status.state === 'processing') {
      await kvSet(`pet:${id}:status`, { state: 'processing' });
      await triggerProcess(url.origin, id, gender);
      // refresh status after processing attempt
      const after = (await kvGet(`pet:${id}:status`)) as PetStatus | null;
      if (after && after.state === 'done' && after.url) {
        return new Response(JSON.stringify(after.url), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
      if (after && after.state === 'error') {
        return new Response(after.error || 'processing error', { status: 500, headers: { 'Content-Type': 'text/plain' } });
      }
    }

    // Not ready yet; return non-2xx so client keeps polling
    return new Response('processing', { status: 409 });
  } catch (err: any) {
    return new Response(`Error: ${err?.message || 'unknown error'}`, { status: 500 });
  }
};
