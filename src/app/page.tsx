import Image from "next/image";
import { fetchImagesFromDrive } from '@/lib/googleDrive';
import ImageGallery from '@/components/ImageGallery';

interface ImageData {
  id: string;
  name: string;
  createdTime: string;
  url: string;
  thumbnailUrl: string;
}

async function getImages(): Promise<ImageData[]> {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!folderId) {
      console.error('Google Drive folder ID not configured');
      return [];
    }
    const images = await fetchImagesFromDrive(folderId);
    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

export default async function Home() {
  const images = await getImages();

  return (
    <div className="min-h-screen p-2">
      <div className="w-full min-h-screen">
        <div className="flex flex-col gap-6">
          <Image src="/iso.svg" alt="iso" width={120} height={35} className="object-contain" />
          <ImageGallery images={images} />
        </div>
      </div>
    </div>
  );
}
// Revalidate every hour to check for new images
export const revalidate = 3600;

// Force dynamic rendering
export const dynamic = 'force-dynamic';


