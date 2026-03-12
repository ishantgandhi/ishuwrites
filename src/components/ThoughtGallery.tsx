"use client";

import { useEffect, useId, useState } from "react";

type ThoughtData = {
  id: string;
  createdTime: string;
  url: string;
};

function formatDMY(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${dd}-${mm}-${yyyy}`;
}

function parseDMYToISO(input: string) {
  const raw = input.trim();
  const m = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (!m) return null;
  const dd = Number(m[1]);
  const mm = Number(m[2]);
  const yyyy = Number(m[3]);
  if (!Number.isFinite(dd) || !Number.isFinite(mm) || !Number.isFinite(yyyy)) return null;
  if (yyyy < 1900 || yyyy > 3000) return null;
  if (mm < 1 || mm > 12) return null;
  if (dd < 1 || dd > 31) return null;

  // Use UTC to avoid timezone shifting the visible date.
  const dt = new Date(Date.UTC(yyyy, mm - 1, dd, 12, 0, 0));
  if (
    dt.getUTCFullYear() !== yyyy ||
    dt.getUTCMonth() !== mm - 1 ||
    dt.getUTCDate() !== dd
  )
    return null; // invalid dates like 31-02-2026

  return dt.toISOString();
}

export default function ThoughtGallery({
  thoughts,
  editingId,
  onToggleEdit,
  onDelete,
  onUpdateDate,
}: {
  thoughts: ThoughtData[];
  editingId: string | null;
  onToggleEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateDate: (id: string, createdTimeISO: string) => void;
}) {
  const hasThoughts = thoughts.length > 0;

  if (!hasThoughts) return null;

  return (
    <div className="flex flex-row flex-wrap gap-2 items-start justify-start">
      {thoughts.map((t) => (
        <ThoughtCard
          key={t.id}
          id={t.id}
          createdTime={t.createdTime}
          isEditing={editingId === t.id}
          onToggleEdit={onToggleEdit}
          onDelete={onDelete}
          onUpdateDate={onUpdateDate}
        />
      ))}
    </div>
  );
}

function ThoughtCard({
  id,
  createdTime,
  isEditing,
  onToggleEdit,
  onDelete,
  onUpdateDate,
}: {
  id: string;
  createdTime: string;
  isEditing: boolean;
  onToggleEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateDate: (id: string, createdTimeISO: string) => void;
}) {
  const inputId = useId();
  const [dateDraft, setDateDraft] = useState(() => formatDMY(createdTime));

  useEffect(() => {
    setDateDraft(formatDMY(createdTime));
  }, [createdTime]);

  const commitDate = () => {
    const iso = parseDMYToISO(dateDraft);
    if (!iso) {
      setDateDraft(formatDMY(createdTime));
      return;
    }
    onUpdateDate(id, iso);
  };

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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.5 5.5l3 3" />
        </svg>
      </button>

      {isEditing ? (
        <button
          type="button"
          aria-label="Delete card"
          title="Delete card"
          onClick={() => onDelete(id)}
          className="absolute bottom-2 left-2 z-10 rounded-md border border-black/10 bg-[#fbf7ef]/80 p-1 text-red-600 backdrop-blur"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 7h12" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11v6M14 11v6" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 7l1-2h4l1 2m-9 0l1 14h10l1-14"
            />
          </svg>
        </button>
      ) : null}

      <div className="absolute bottom-2 right-2 z-10">
        {isEditing ? (
          <label
            htmlFor={inputId}
            className="typewriter-input rounded-md border border-black/10 bg-[#fbf7ef]/70 px-2 py-1 text-[11px] text-black/60 backdrop-blur"
          >
            <input
              id={inputId}
              value={dateDraft}
              onChange={(e) => setDateDraft(e.target.value)}
              onBlur={commitDate}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  (e.currentTarget as HTMLInputElement).blur();
                }
                if (e.key === "Escape") {
                  e.preventDefault();
                  setDateDraft(formatDMY(createdTime));
                  (e.currentTarget as HTMLInputElement).blur();
                }
              }}
              inputMode="numeric"
              className="w-[92px] bg-transparent outline-none"
              aria-label="Edit date (dd-mm-yyyy)"
            />
          </label>
        ) : (
          <div className="pointer-events-none typewriter-input rounded-md border border-black/10 bg-[#fbf7ef]/70 px-2 py-1 text-[11px] text-black/60 backdrop-blur">
            {formatDMY(createdTime)}
          </div>
        )}
      </div>

      <textarea
        placeholder="Write a thought…"
        readOnly={!isEditing}
        className="typewriter-input absolute inset-0 h-full w-full resize-none bg-transparent p-4 text-[15px] leading-6 text-black/90 outline-none"
      />
    </div>
  );
}

