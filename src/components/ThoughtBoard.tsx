"use client";

import { useEffect, useMemo, useState } from "react";

import ThoughtGallery from "@/components/ThoughtGallery";

type Thought = {
  id: string;
  text: string;
  createdTime: string;
};

export default function ThoughtBoard() {
  const [thoughtsState, setThoughtsState] = useState<Thought[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/thoughts", { cache: "no-store" });
        const json = (await res.json()) as {
          thoughts: Array<{ id: string; text: string; createdTime: string }>;
        };
        if (cancelled) return;
        setThoughtsState(
          (json.thoughts ?? []).map((t) => ({
            id: t.id,
            text: t.text ?? "",
            createdTime: t.createdTime,
          })),
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const thoughts = useMemo(
    () =>
      [...thoughtsState].sort(
        (a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime(),
      ),
    [thoughtsState],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="typewriter-input text-black/90 text-lg tracking-tight">ishu writes</div>
        <button
          type="button"
          onClick={async () => {
            const res = await fetch("/api/thoughts", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ text: "", createdTime: new Date().toISOString() }),
            });
            const json = (await res.json()) as {
              thought: { id: string; text: string; createdTime: string };
            };
            const t = json.thought;
            setThoughtsState((prev) => [{ id: t.id, text: t.text ?? "", createdTime: t.createdTime }, ...prev]);
          }}
          className="typewriter-input rounded-l border border-black/10 bg-black/5 px-3 py-2 text-sm text-black/80"
          aria-label="Add new card"
          title="Add new card"
        >
          add
        </button>
      </div>

      {loading ? (
        <div className="typewriter-input text-sm text-black/50">loading…</div>
      ) : null}

      <ThoughtGallery
        thoughts={thoughts}
        editingId={editingId}
        onToggleEdit={(id) => setEditingId((prev) => (prev === id ? null : id))}
        onDelete={async (id) => {
          await fetch(`/api/thoughts/${id}`, { method: "DELETE" });
          setThoughtsState((prev) => prev.filter((t) => t.id !== id));
          setEditingId((prev) => (prev === id ? null : prev));
        }}
        onUpdateDate={async (id, createdTimeISO) => {
          await fetch(`/api/thoughts/${id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ createdTime: createdTimeISO }),
          });
          setThoughtsState((prev) =>
            prev.map((t) => (t.id === id ? { ...t, createdTime: createdTimeISO } : t)),
          );
        }}
        onUpdateText={async (id: string, text: string) => {
          await fetch(`/api/thoughts/${id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ text }),
          });
          setThoughtsState((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
        }}
      />
    </div>
  );
}

