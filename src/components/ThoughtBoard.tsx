"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import ImageGallery from "@/components/ImageGallery";

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function ThoughtBoard({ initialCount = 8 }: { initialCount?: number }) {
  const [ids, setIds] = useState<string[]>(() =>
    Array.from({ length: Math.max(0, initialCount) }, () => makeId()),
  );

  const cards = useMemo(
    () =>
      ids.map((id, idx) => ({
        id,
        name: `Card ${idx + 1}`,
        createdTime: new Date().toISOString(),
        url: "",
      })),
    [ids],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="typewriter-input text-black/90 text-lg tracking-tight">ishu writes</div>
        <button
          type="button"
          onClick={() => setIds((prev) => [...prev, makeId()])}
          className="rounded-2xl bg-black/5 p-2"
          aria-label="Add new card"
          title="Add new card"
        >
          <Image src="/icon.svg" alt="App icon" width={36} height={36} />
        </button>
      </div>

      <ImageGallery images={cards} />
    </div>
  );
}

