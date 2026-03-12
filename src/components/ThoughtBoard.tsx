"use client";

import { useMemo, useState } from "react";

import ThoughtGallery from "@/components/ThoughtGallery";

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

type Card = {
  id: string;
  createdTime: string;
};

export default function ThoughtBoard({ initialCount = 8 }: { initialCount?: number }) {
  const [cardsState, setCardsState] = useState<Card[]>(() =>
    Array.from({ length: Math.max(0, initialCount) }, () => ({
      id: makeId(),
      createdTime: new Date().toISOString(),
    })),
  );
  const [editingId, setEditingId] = useState<string | null>(null);

  const cards = useMemo(
    () =>
      [...cardsState]
        .sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime())
        .map((c) => ({
          id: c.id,
          createdTime: c.createdTime,
          url: "",
        })),
    [cardsState],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="typewriter-input text-black/90 text-lg tracking-tight">ishu writes</div>
        <button
          type="button"
          onClick={() =>
            setCardsState((prev) => [{ id: makeId(), createdTime: new Date().toISOString() }, ...prev])
          }
          className="typewriter-input rounded-l border border-black/10 bg-black/5 px-3 py-2 text-sm text-black/80"
          aria-label="Add new card"
          title="Add new card"
        >
          add
        </button>
      </div>

      <ThoughtGallery
        thoughts={cards}
        editingId={editingId}
        onToggleEdit={(id) => setEditingId((prev) => (prev === id ? null : id))}
        onDelete={(id) => {
          setCardsState((prev) => prev.filter((c) => c.id !== id));
          setEditingId((prev) => (prev === id ? null : prev));
        }}
        onUpdateDate={(id, createdTimeISO) =>
          setCardsState((prev) => prev.map((c) => (c.id === id ? { ...c, createdTime: createdTimeISO } : c)))
        }
      />
    </div>
  );
}

