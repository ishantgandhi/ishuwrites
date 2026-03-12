"use client";

type ImageData = {
  id: string;
  createdTime: string;
  url: string;
};

export default function ImageGallery({ images }: { images: ImageData[] }) {
  const hasImages = images.length > 0;

  if (!hasImages) return null;

  return (
    <div className="flex flex-row flex-wrap gap-2 items-start justify-start">
      {images.map((image) => (
        <CardItem key={image.id} />
      ))}
    </div>
  );
}

function CardItem() {
  return (
    <div className="paper-card w-full sm:w-[calc(50%-4px)] md:w-[calc(33.333%-5.33px)] lg:w-[calc(25%-6px)] aspect-[4/3] relative overflow-hidden">
      <textarea
        placeholder="Write a thought…"
        className="typewriter-input absolute inset-0 h-full w-full resize-none bg-transparent p-4 text-[15px] leading-6 text-black/90 outline-none"
      />
    </div>
  );
}

