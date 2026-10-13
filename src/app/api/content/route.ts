import { NextRequest, NextResponse } from 'next/server';
import { wordPressProvider } from '@/src/providers/WordPressProvider';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const services = await wordPressProvider.asyncGetAllServices();
    const industries = await wordPressProvider.asyncGetAllIndustries();
    const locations = await wordPressProvider.asyncGetAllLocations();
    const caseStudies = await wordPressProvider.asyncGetAllCaseStudies();
    const insights = await wordPressProvider.asyncGetAllInsights();

    return NextResponse.json(
      {
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
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || 'Failed to retrieve cached WordPress content',
      },
      { status: 500 }
    );
  }
}
