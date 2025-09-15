import type { APIRoute } from 'astro';
import crypto from 'node:crypto';
import { kvSet } from '../../lib/server/kv';
import { pickExtFromFileLike, saveUpload } from '../../lib/server/storage';

export const POST: APIRoute = async ({ request, url }) => {
  try {
    const form = await request.formData();
    const image = form.get('image');
    const gender = (form.get('gender') as string) || 'unknown';
    if (!image || !(image instanceof File)) {
      return new Response('Missing image', { status: 400 });
    }

    const id = crypto.randomUUID();
    const ext = pickExtFromFileLike(image);
    const contentType = (image as any).type || 'application/octet-stream';
    const bytes = new Uint8Array(await image.arrayBuffer());

    const saved = await saveUpload(id, ext, bytes, contentType);

    await kvSet(`pet:${id}:meta`, {
      gender,
      src: saved.url,
      ext,
      contentType,
    });
    await kvSet(`pet:${id}:status`, { state: 'uploaded' });

    // Plain text is expected by existing client
    return new Response(id, { status: 200, headers: { 'Content-Type': 'text/plain' } });
  } catch (err: any) {
    return new Response(`Upload failed: ${err?.message || 'unknown error'}`, { status: 500 });
  }
};

