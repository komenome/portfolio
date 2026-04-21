"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/checker", label: "ID Checker" },
  { href: "/catalog", label: "Catalog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#06060b]/80 backdrop-blur-2xl border-b border-white/[0.04] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00e5ff] to-[#b347ff] flex items-center justify-center text-sm font-bold text-[#06060b]">
            B
          </div>
          <span className="font-heading font-bold text-xl text-white">
            BINGO
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2 text-[13px] font-medium text-gray-400 rounded-lg hover:text-white hover:bg-white/[0.04] transition-all"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="https://t.me/KomeNome"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex btn-primary text-xs !py-2.5 !px-5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.76-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.92 1.22-5.42 3.58-.51.35-.97.52-1.38.51-.46-.01-1.34-.26-1.99-.47-.8-.26-1.44-.4-1.39-.85.03-.24.36-.49 1-.74 3.91-1.7 6.52-2.83 7.82-3.37 3.72-1.55 4.49-1.82 4.99-1.83.11 0 .36.03.52.17.13.12.17.28.19.45-.01.06.01.24 0 .38z"/>
            </svg>
            Telegram
          </a>
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#06060b]/95 backdrop-blur-2xl border-b border-white/[0.04] overflow-hidden"
          >
            <ul className="flex flex-col p-6 gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-base font-medium text-gray-300 rounded-xl hover:bg-white/[0.04] hover:text-white transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-3">
                <a
                  href="https://t.me/KomeNome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact via Telegram
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}