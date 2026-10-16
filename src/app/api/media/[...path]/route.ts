import { NextRequest, NextResponse } from 'next/server';
import { wordPressProvider } from '@/src/providers/WordPressProvider';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  if (!path || path.length === 0) {
    return new NextResponse('Media not found', { status: 404 });
  }

  const mediaPath = path.join('/');
  const mediaResult = await wordPressProvider.fetchWordPressMedia(mediaPath);

  if (!mediaResult) {
    return new NextResponse('Media not found', { status: 404 });
  }

  return new NextResponse(mediaResult.buffer, {
    status: 200,
    headers: {
      'Content-Type': mediaResult.contentType || 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
