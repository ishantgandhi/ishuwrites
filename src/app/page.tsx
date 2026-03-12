import ImageGallery from "@/components/ImageGallery";
import { images } from "@/data/images";

export default async function Home() {
  return (
    <div className="min-h-screen p-2">
      <div className="w-full min-h-screen">
        <div className="flex flex-col gap-6">
          <ImageGallery images={images} />
        </div>
      </div>
    </div>
  );
}
