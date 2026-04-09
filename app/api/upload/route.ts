export const runtime = 'edge';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return Response.json({ ok: false }, { status: 400 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: true });
  }
}
