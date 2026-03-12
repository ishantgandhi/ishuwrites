"use client";

type ImageData = {
  id: string;
  createdTime: string;
  url: string;
};

export default function ImageGallery({
  images,
  editingId,
  onToggleEdit,
}: {
  images: ImageData[];
  editingId: string | null;
  onToggleEdit: (id: string) => void;
}) {
  const hasImages = images.length > 0;

  if (!hasImages) return null;

  return (
    <div className="flex flex-row flex-wrap gap-2 items-start justify-start">
      {images.map((image) => (
        <CardItem
          key={image.id}
          id={image.id}
          isEditing={editingId === image.id}
          onToggleEdit={onToggleEdit}
        />
      ))}
    </div>
  );
}

function CardItem({
  id,
  isEditing,
  onToggleEdit,
}: {
  id: string;
  isEditing: boolean;
  onToggleEdit: (id: string) => void;
}) {
  return (
    <div className="paper-card w-full sm:w-[calc(50%-4px)] md:w-[calc(33.333%-5.33px)] lg:w-[calc(25%-6px)] aspect-[4/3] relative overflow-hidden">
      <button
        type="button"
        aria-label={isEditing ? "Lock card" : "Edit card"}
        title={isEditing ? "Lock" : "Edit"}
        onClick={() => onToggleEdit(id)}
        className="absolute right-2 top-2 z-10 rounded-md border border-black/10 bg-[#fbf7ef]/80 p-1 text-black/70 backdrop-blur"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16.862 3.487a2.1 2.1 0 0 1 2.97 2.97L8.9 17.39a4 4 0 0 1-1.69 1.01l-3.02.86.86-3.02A4 4 0 0 1 6.06 14.55l10.802-11.063z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.5 5.5l3 3"
          />
        </svg>
      </button>
      <textarea
        placeholder="Write a thought…"
        readOnly={!isEditing}
        className="typewriter-input absolute inset-0 h-full w-full resize-none bg-transparent p-4 text-[15px] leading-6 text-black/90 outline-none"
      />
    </div>
  );
}

