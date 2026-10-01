import { NextRequest, NextResponse } from 'next/server';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { public_id, resource_type = 'image' } = await req.json();

    if (!public_id) {
      return NextResponse.json({ success: false, error: 'public_id is required' }, { status: 400 });
    }

    const result = await deleteFromCloudinary(public_id, resource_type);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Cloudinary delete error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Delete failed' },
      { status: 500 }
    );
  }
}
