import type { APIRoute } from 'astro';
export const prerender = false;
import { processPet } from '../../lib/server/process';

export const POST: APIRoute = async ({ request, url }) => {
  let id = '';
  try {
    const contentType = request.headers.get('content-type') || '';
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

    await processPet(id, gender);
    return new Response('ok', { status: 200 });
  } catch (err: any) {
    try {
      // best-effort mark as error so polling can stop
      if (!id) {
        const u = new URL(request.url);
        id = u.searchParams.get('id') || '';
      }
      if (id) {
        const { kvSet } = await import('../../lib/server/kv');
        await kvSet(`pet:${id}:status`, { state: 'error', error: err?.message || 'unknown' });
      }
    } catch {}
    return new Response(`worker error: ${err?.message || 'unknown'}`, { status: 500 });
  }
};
