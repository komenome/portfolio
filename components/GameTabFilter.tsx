"use client";

import { cn } from "@/lib/utils";

type GameId = "mlbb-global" | "mlbb-mysg" | "magic-chess" | "pubg-global";

const TABS = [
  {
    id: "mlbb-global" as GameId,
    label: "MLBB",
    sublabel: "Global",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    id: "mlbb-mysg" as GameId,
    label: "MLBB",
    sublabel: "MY/SG",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    id: "magic-chess" as GameId,
    label: "Magic Chess",
    sublabel: null,
    icon: <span className="text-base">♟️</span>,
  },
  {
    id: "pubg-global" as GameId,
    label: "PUBG",
    sublabel: "Global",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
        <line x1="12" y1="2" x2="12" y2="6"/>
        <line x1="12" y1="18" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="6" y2="12"/>
        <line x1="18" y1="12" x2="22" y2="12"/>
      </svg>
    ),
  },
];

interface GameTabFilterProps {
  activeGame: string;
  onGameChange: (game: string) => void;
}

export function GameTabFilter({ activeGame, onGameChange }: GameTabFilterProps) {
  return (
    <div className="inline-flex items-center gap-1.5 p-1.5 bg-surface-2 rounded-2xl border border-white/[0.06]">
      {TABS.map((tab) => {
        const isActive = activeGame === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onGameChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
              isActive
                ? "bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20 shadow-[0_0_20px_rgba(0,229,255,0.1)]"
                : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.03] border border-transparent"
            )}
          >
            {tab.icon}
            <span className="flex flex-col items-start leading-tight">
              <span>{tab.label}</span>
              {tab.sublabel && <span className="text-[10px] opacity-60">{tab.sublabel}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}