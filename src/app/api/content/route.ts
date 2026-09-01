import { NextRequest, NextResponse } from 'next/server';
import { wordPressProvider } from '@/src/providers/WordPressProvider';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const forceRefresh = url.searchParams.get('refresh') === 'true';

    if (forceRefresh) {
      wordPressProvider.clearCache();
    }

    const [services, industries, locations, caseStudies, insights] = await Promise.all([
      wordPressProvider.asyncGetAllServices(),
      wordPressProvider.asyncGetAllIndustries(),
      wordPressProvider.asyncGetAllLocations(),
      wordPressProvider.asyncGetAllCaseStudies(),
      wordPressProvider.asyncGetAllInsights(),
    ]);

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      counts: {
        services: services.length,
        industries: industries.length,
        locations: locations.length,
        caseStudies: caseStudies.length,
        insights: insights.length,
      },
      data: {
        services,
        industries,
        locations,
        caseStudies,
        insights,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || 'Failed to retrieve real-time WordPress content',
      },
      { status: 500 }
    );
  }
}
