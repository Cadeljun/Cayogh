import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    // Handle multipart/form-data
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const folder = (formData.get('folder') as string) || 'cayodrinks/website';
      const resourceType = ((formData.get('resourceType') as string) || 'auto') as 'image' | 'video' | 'auto';
      const tags = formData.get('tags') ? (formData.get('tags') as string).split(',').map(t => t.trim()) : ['cayodrinks'];

      if (!file) {
        return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = file.type || (resourceType === 'video' ? 'video/mp4' : 'image/jpeg');
      const base64Data = `data:${mimeType};base64,${buffer.toString('base64')}`;

      const uploadResult = await uploadToCloudinary(base64Data, {
        folder,
        resourceType,
        tags,
      });

      return NextResponse.json({
        success: true,
        media: {
          asset_id: uploadResult.asset_id,
          public_id: uploadResult.public_id,
          format: uploadResult.format,
          resource_type: uploadResult.resource_type,
          created_at: uploadResult.created_at,
          bytes: uploadResult.bytes,
          width: uploadResult.width,
          height: uploadResult.height,
          secure_url: uploadResult.secure_url,
          url: uploadResult.url,
          duration: uploadResult.duration,
        },
      });
    }

    // Handle application/json
    const body = await req.json();
    const { file, folder = 'cayodrinks/website', resourceType = 'auto', tags = ['cayodrinks'] } = body;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file data or URL provided' }, { status: 400 });
    }

    const uploadResult = await uploadToCloudinary(file, {
      folder,
      resourceType,
      tags,
    });

    return NextResponse.json({
      success: true,
      media: {
        asset_id: uploadResult.asset_id,
        public_id: uploadResult.public_id,
        format: uploadResult.format,
        resource_type: uploadResult.resource_type,
        created_at: uploadResult.created_at,
        bytes: uploadResult.bytes,
        width: uploadResult.width,
        height: uploadResult.height,
        secure_url: uploadResult.secure_url,
        url: uploadResult.url,
        duration: uploadResult.duration,
      },
    });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Upload to Cloudinary failed' },
      { status: 500 }
    );
  }
}
