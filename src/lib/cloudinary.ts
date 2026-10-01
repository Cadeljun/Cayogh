import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configure Cloudinary with environment variables or the user's provided credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dmd5bq3va',
  api_key: process.env.CLOUDINARY_API_KEY || '121334627925541',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'UzRtN2Edj-2UbZ5F3TG5nAl-4tI',
  secure: true,
});

export { cloudinary };

export interface CloudinaryResource {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: 'image' | 'video';
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  asset_folder?: string;
  display_name?: string;
  url: string;
  secure_url: string;
  duration?: number;
}

/**
 * Fetch media resources (images, videos) from Cloudinary
 */
export async function getCloudinaryResources(options: {
  resourceType?: 'image' | 'video' | 'all';
  folderPrefix?: string;
  maxResults?: number;
  cayoOnly?: boolean;
} = {}): Promise<CloudinaryResource[]> {
  const { resourceType = 'all', folderPrefix, maxResults = 100, cayoOnly = false } = options;

  try {
    const fetchPromises: Promise<any>[] = [];

    if (resourceType === 'all' || resourceType === 'image') {
      const imgParams: Record<string, any> = {
        resource_type: 'image',
        type: 'upload',
        max_results: maxResults,
      };
      if (folderPrefix && folderPrefix !== 'cayodrinks') imgParams.prefix = folderPrefix;
      fetchPromises.push(cloudinary.api.resources(imgParams));
    }

    if (resourceType === 'all' || resourceType === 'video') {
      const vidParams: Record<string, any> = {
        resource_type: 'video',
        type: 'upload',
        max_results: maxResults,
      };
      if (folderPrefix && folderPrefix !== 'cayodrinks') vidParams.prefix = folderPrefix;
      fetchPromises.push(cloudinary.api.resources(vidParams));
    }

    const results = await Promise.all(fetchPromises);
    let combined: CloudinaryResource[] = [];

    for (const res of results) {
      if (res && Array.isArray(res.resources)) {
        combined.push(...res.resources);
      }
    }

    // Filter to Cayo Drinks assets if requested (or if folderPrefix is cayodrinks)
    if (cayoOnly || folderPrefix === 'cayodrinks' || folderPrefix === 'cayo') {
      combined = combined.filter((item) => {
        const id = item.public_id?.toLowerCase() || '';
        const folder = item.asset_folder?.toLowerCase() || '';
        return (
          id.startsWith('cayo') ||
          id.startsWith('brand') ||
          folder.includes('cayo') ||
          folder.includes('cayodrinks')
        );
      });
    }

    // Sort by created_at descending (newest first)
    combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return combined;
  } catch (error) {
    console.error('Error fetching Cloudinary resources:', error);
    throw error;
  }
}

/**
 * Server-side upload to Cloudinary using either base64, buffer data URI, or remote URL
 */
export async function uploadToCloudinary(
  fileDataUriOrUrl: string,
  options: {
    folder?: string;
    publicId?: string;
    resourceType?: 'image' | 'video' | 'auto';
    tags?: string[];
    preset?: string;
  } = {}
): Promise<UploadApiResponse> {
  const uploadOptions: Record<string, any> = {
    resource_type: options.resourceType || 'auto',
    folder: options.folder || 'cayodrinks/website',
  };

  if (options.preset) uploadOptions.upload_preset = options.preset;
  if (options.publicId) uploadOptions.public_id = options.publicId;
  if (options.tags && options.tags.length > 0) uploadOptions.tags = options.tags;

  return await cloudinary.uploader.upload(fileDataUriOrUrl, uploadOptions);
}

/**
 * Delete a media resource from Cloudinary
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' = 'image'
) {
  return await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}
