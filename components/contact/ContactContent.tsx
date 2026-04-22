"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const contacts = [
  {
    label: "Telegram",
    href: "https://t.me/KomeNome",
    desc: "Fastest response",
    color: "#00e5ff",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.76-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.92 1.22-5.42 3.58-.51.35-.97.52-1.38.51-.46-.01-1.34-.26-1.99-.47-.8-.26-1.44-.4-1.39-.85.03-.24.36-.49 1-.74 3.91-1.7 6.52-2.83 7.82-3.37 3.72-1.55 4.49-1.82 4.99-1.83.11 0 .36.03.52.17.13.12.17.28.19.45-.01.06.01.24 0 .38z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/KomeNome.flac",
    desc: "Community",
    color: "#d946ef",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "Viber",
    href: "viber://chat?number=959985651375",
    desc: "Direct chat",
    color: "#7c4dff",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
];

export function ContactContent() {
  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center">
      <div className="max-w-2xl mx-auto px-6 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="section-label cyan mx-auto w-fit mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Contact Us
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Get in <span className="text-[#00e5ff] glow-cyan">Touch</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
            Contact us for orders, questions, or custom requests. We respond within minutes on Telegram.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-8 text-center group"
              style={{ "--hover-color": c.color } as React.CSSProperties}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300"
                style={{ background: `${c.color}15`, color: c.color }}
              >
                {c.icon}
              </div>
              <h3 className="font-heading font-semibold text-white text-lg mb-1">{c.label}</h3>
              <p className="text-sm text-gray-500">{c.desc}</p>
            </motion.a>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass p-8 text-center"
        >
          <h2 className="font-heading font-semibold text-white text-lg mb-2">Working Hours</h2>
          <p className="text-gray-400 text-sm mb-4">We are available 9 AM – 11 PM for your convenience.</p>
          <p className="text-3xl font-black text-[#00e5ff] glow-cyan">9 AM – 11 PM</p>
        </motion.div>

        {/* Back Link */}
        <div className="text-center mt-10">
          <Link href="/catalog" className="text-sm text-gray-500 hover:text-[#00e5ff] transition-colors">
            ← Back to Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
