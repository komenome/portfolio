import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { label: "Telegram", href: "https://t.me/KomeNome", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.76-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.92 1.22-5.42 3.58-.51.35-.97.52-1.38.51-.46-.01-1.34-.26-1.99-.47-.8-.26-1.44-.4-1.39-.85.03-.24.36-.49 1-.74 3.91-1.7 6.52-2.83 7.82-3.37 3.72-1.55 4.49-1.82 4.99-1.83.11 0 .36.03.52.17.13.12.17.28.19.45-.01.06.01.24 0 .38z"/>
    </svg>
  )},
  { label: "Facebook", href: "https://www.facebook.com/KomeNome.flac", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )},
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-[#06060b]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00e5ff] to-[#b347ff] flex items-center justify-center text-sm font-bold text-[#06060b]">
                B
              </div>
              <span className="font-heading font-bold text-xl text-white">BINGO</span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs mt-3 leading-relaxed">
              Your trusted game top-up service in Myanmar. Fast, reliable, and affordable.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-[#00e5ff] hover:border-[#00e5ff]/20 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-[#00e5ff] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="https://t.me/KomeNome" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-[#00e5ff] transition-colors">
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/KomeNome.flac" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-[#00e5ff] transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="viber://chat?number=959985651375" className="text-sm text-gray-500 hover:text-[#00e5ff] transition-colors">
                  Viber
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="divide-line mt-12 mb-8" />
        <p className="text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} BINGO. All rights reserved.
        </p>
      </div>
    </footer>
  );
}