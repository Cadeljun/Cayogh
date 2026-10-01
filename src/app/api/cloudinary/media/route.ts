import { NextRequest, NextResponse } from 'next/server';
import { getCloudinaryResources } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = (searchParams.get('type') || 'all') as 'image' | 'video' | 'all';
    const folder = searchParams.get('folder') || undefined;
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const cayoOnly = searchParams.get('cayoOnly') === 'true' || folder === 'cayodrinks' || folder === 'cayo';

    const resources = await getCloudinaryResources({
      resourceType: type,
      folderPrefix: folder,
      maxResults: limit,
      cayoOnly,
    });

    return NextResponse.json({
      success: true,
      count: resources.length,
      resources,
    });
  } catch (error: any) {
    console.error('Failed to get Cloudinary media:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch Cloudinary media' },
      { status: 500 }
    );
  }
}
