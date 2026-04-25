"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface CheckResult {
  valid: boolean;
  ign?: string;
  country?: string;
  available_tiers?: string[];
}

const TIERS = ["50+50", "150+150", "250+250", "500+500"];

export default function CheckerPage() {
  const [gameId, setGameId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "found" | "notfound">("idle");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameId.trim() || !zoneId.trim()) return;

    setState("loading");
    setError("");

    try {
      const res = await fetch("/api/check-mlbb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: gameId.trim(), zoneId: zoneId.trim() }),
      });

      const data = await res.json();

      if (data.valid) {
        setResult(data);
        setState("found");
      } else {
        setResult(null);
        setState("notfound");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setState("notfound");
    }
  };

  const handleReset = () => {
    setState("idle");
    setResult(null);
    setError("");
    setGameId("");
    setZoneId("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,229,255,0.06)_0%,_transparent_50%),_radial-gradient(ellipse_at_bottom_left,_rgba(179,71,255,0.06)_0%,_transparent_50%)]" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#00e5ff]/[0.03] rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#b347ff]/[0.03] rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="section-label cyan mx-auto w-fit mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            MLBB ID Verification
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
            ID Checker
          </h1>
          <p className="text-gray-400 text-sm max-w-xs mx-auto">
            Enter your Game ID and Zone ID to verify your account before purchasing.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card p-8 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {/* ── INPUT STATE ── */}
            {state === "idle" && (
              <motion.form
                key="input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                    Game ID
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value.replace(/\D/g, ""))}
                    placeholder="e.g. 12345678"
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00e5ff]/50 focus:ring-1 focus:ring-[#00e5ff]/20 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                    Zone ID
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value.replace(/\D/g, ""))}
                    placeholder="e.g. 3001"
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00e5ff]/50 focus:ring-1 focus:ring-[#00e5ff]/20 transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary justify-center"
                  disabled={!gameId.trim() || !zoneId.trim()}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Verify Account
                </button>
              </motion.form>
            )}

            {/* ── LOADING STATE ── */}
            {state === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="py-12 text-center"
              >
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
                  <div className="absolute inset-0 rounded-full border-2 border-t-[#00e5ff] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                </div>
                <p className="text-white font-medium text-lg">Checking ID...</p>
                <p className="text-gray-500 text-sm mt-2">Please wait while we verify your account</p>
              </motion.div>
            )}

            {/* ── NOT FOUND STATE ── */}
            {state === "notfound" && (
              <motion.div
                key="notfound"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  Account Not Found
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  {error || "We couldn't find an account with that Game ID and Zone ID. Please double-check and try again."}
                </p>
                <button onClick={handleReset} className="btn-primary justify-center w-full">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M1 4v6h6" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  Try Again
                </button>
              </motion.div>
            )}

            {/* ── FOUND STATE ── */}
            {state === "found" && result && (
              <motion.div
                key="found"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Success badge */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">Account Found</h3>
                    <p className="text-gray-500 text-xs">Verified successfully</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                    <span className="text-gray-400 text-sm">Game ID</span>
                    <span className="text-white font-mono text-sm font-medium">
                      {gameId} {zoneId}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                    <span className="text-gray-400 text-sm">Name</span>
                    <span className="text-white text-sm font-medium">{result.ign}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                    <span className="text-gray-400 text-sm">Region</span>
                    <span className="text-white text-sm font-medium">{result.country}</span>
                  </div>
                </div>

                {/* Double Dia Tiers */}
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                    Double Diamond Availability
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {TIERS.map((tier) => {
                      const isAvailable = result.available_tiers?.includes(tier);
                      return (
                        <div
                          key={tier}
                          className={`flex items-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-medium ${
                            isAvailable
                              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                              : "bg-red-500/20 border-red-500/50 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                          }`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          <span>{tier}</span>
                          {isAvailable ? (
                            <svg className="ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <svg className="ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2 space-y-3">
                  <a
                    href="https://t.me/KomeNome"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary justify-center"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.76-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.92 1.22-5.42 3.58-.51.35-.97.52-1.38.51-.46-.01-1.34-.26-1.99-.47-.8-.26-1.44-.4-1.39-.85.03-.24.36-.49 1-.74 3.91-1.7 6.52-2.83 7.82-3.37 3.72-1.55 4.49-1.82 4.99-1.83.11 0 .36.03.52.17.13.12.17.28.19.45-.01.06.01.24 0 .38z" />
                    </svg>
                    Contact Telegram to Buy
                  </a>
                  {(() => {
                    const country = result.country?.toUpperCase().trim() || "";
                    const excluded = ["PH", "ID", "MY", "SG", "RU", "PHILIPPINES", "INDONESIA", "MALAYSIA", "SINGAPORE", "RUSSIA", "RUSSIAN FEDERATION"];
                    const showPrices = !excluded.includes(country);
                    return showPrices ? (
                      <Link
                        href="/catalog"
                        className="w-full btn-outline justify-center text-sm inline-flex items-center gap-2"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        View Prices
                      </Link>
                    ) : null;
                  })()}
                  <button
                    onClick={handleReset}
                    className="w-full btn-outline justify-center text-sm"
                  >
                    Check Another ID
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link href="/" className="text-gray-500 hover:text-white text-sm transition-colors inline-flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
