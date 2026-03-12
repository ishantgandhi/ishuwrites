"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import ThoughtBoard from "@/components/ThoughtBoard";

const ACCESS_CODE = "khuljass";
const STORAGE_KEY = "ishu.writes:unlocked";

export default function AccessGate() {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "1") setUnlocked(true);
    } finally {
      setReady(true);
    }
  }, []);

  const canSubmit = useMemo(() => code.trim().length > 0, [code]);

  const submit = () => {
    const ok = code.trim() === ACCESS_CODE;
    if (!ok) {
      setError(true);
      return;
    }
    setError(false);
    setUnlocked(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen p-2">
      <div className="w-full min-h-screen">
        <motion.div
          key={unlocked ? "board" : "gate"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {unlocked ? (
            <ThoughtBoard initialCount={10} />
          ) : (
            <div className="flex min-h-[70vh] items-center justify-center">
              <div className="w-full max-w-sm">
                <div className="typewriter-input text-black/90 text-lg tracking-tight">ishu writes</div>

                <div className="mt-3">
                  <input
                    type="password"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setError(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") submit();
                    }}
                    placeholder="code"
                    className="typewriter-input w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-black/90 outline-none"
                    autoFocus
                    spellCheck={false}
                  />

                  <div className="mt-2 flex items-center justify-between">
                    <div className="typewriter-input text-xs text-red-600">
                      {error ? "wrong code" : "\u00A0"}
                    </div>
                    <button
                      type="button"
                      onClick={submit}
                      disabled={!canSubmit}
                      className="typewriter-input rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black/80 disabled:opacity-40"
                    >
                      unlock
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

