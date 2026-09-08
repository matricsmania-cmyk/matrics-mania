import { NextRequest, NextResponse } from 'next/server';
import { wordPressProvider } from '@/src/providers/WordPressProvider';

export const revalidate = 3600;

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
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
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
