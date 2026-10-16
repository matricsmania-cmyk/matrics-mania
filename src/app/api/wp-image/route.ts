import { NextRequest, NextResponse } from 'next/server';
import { wordPressProvider } from '@/src/providers/WordPressProvider';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get('url') || req.nextUrl.searchParams.get('src');
  if (!urlParam) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  const mediaResult = await wordPressProvider.fetchWordPressMedia(urlParam);
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
