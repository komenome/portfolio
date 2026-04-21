<div align="center">

<!-- Animated gradient banner -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:00e5ff,50:7c4dff,100:b347ff&height=260&section=header&text=BINGO%20Game%20Top-Up&fontSize=50&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Premium%20Mobile%20Legends%2C%20Magic%20Chess%20%26%20PUBG%20Mobile%20Services&descAlignY=55&descSize=18"/>

<!-- Badges -->
[![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-EFEFEF?style=for-the-badge&logo=framer&logoColor=black)](https://www.framer.com/motion/)

<br/>

[![License](https://img.shields.io/badge/License-MIT-00e5ff?style=flat-square)](LICENSE)
[![Build](https://img.shields.io/badge/Build-Passing-10b981?style=flat-square)]()
[![Deploy](https://img.shields.io/badge/Deploy-Cloudflare%20Workers-F38020?style=flat-square)]()

</div>

---

## 🎮 Overview

**BINGO Game Top-Up** is a premium game top-up service web application built for the Myanmar market. It features a sleek, dark-themed UI with glassmorphism design, real-time price catalog, and an **MLBB ID verification system** that validates Mobile Legends accounts before purchase.

<div align="center">

| 🏠 Home | 🔍 ID Checker | 💰 Catalog |
|:---:|:---:|:---:|
| Hero landing with animated stats | Verify MLBB accounts instantly | Live prices in MMK |

</div>

---

## ✨ Features

### 🎯 ID Verification System
- **Real-time MLBB Account Lookup** — Verify Game ID + Zone ID via Cloudflare Worker
- **Account Details Display** — Shows IGN (In-Game Name) and Region
- **Double Diamond Tier Check** — Displays availability for `50+50`, `150+150`, `250+250`, `500+500`
- **Error Handling** — Smart retry flow for invalid IDs
- **Secure API Proxy** — Worker URL hidden behind Next.js API routes

### 💎 Price Catalog
- **Multi-Game Support** — Mobile Legends, Magic Chess, PUBG Mobile
- **Live Price Fetching** — Integrated with PocketBase backend
- **Server-Switching** — Toggle between MLBB Global, MY/SG, and other regions
- **Category Filtering** — Diamonds, Weekly Pass, Double Diamond bundles

### 🎨 Design & UX
- **Glassmorphism UI** — Frosted glass cards with subtle borders
- **Framer Motion Animations** — Smooth page transitions and micro-interactions
- **Responsive Layout** — Mobile-first, works on all screen sizes
- **Dark Theme** — Premium `#06060b` base with cyan (`#00e5ff`) and purple (`#b347ff`) accents
- **Custom Typography** — Inter + Space Grotesk font pairing

---

## 🏗️ Architecture

```mermaid
flowchart TD
    subgraph Client["🌐 Client Browser"]
        A["/checker Page"] -->|POST /api/check-mlbb| B["Next.js API Route"]
        C["/catalog Page"] -->|GET /api/prices| D["Next.js API Route"]
    end

    subgraph Server["⚡ Server-Side"]
        B -->|MLBB_CHECKER_URL env| E["Cloudflare Worker"]
        D -->|PB_URL env| F["PocketBase Backend"]
    end

    subgraph External["🔗 External APIs"]
        E -->|GET /nickname/ml| G["MLBB ID Verification API"]
        F -->|REST API| H["Prices Database"]
    end

    style Client fill:#1a1a2e,stroke:#00e5ff,color:#fff
    style Server fill:#16213e,stroke:#7c4dff,color:#fff
    style External fill:#0f3460,stroke:#b347ff,color:#fff
```

### 📁 Project Structure

```
Portfolio/
├── app/                          # Next.js App Router
│   ├── api/
│   │   ├── check-mlbb/route.ts   # MLBB ID verification proxy
│   │   └── prices/route.ts       # Price catalog proxy
│   ├── checker/page.tsx          # ID Checker UI
│   ├── catalog/page.tsx          # Price catalog UI
│   ├── about/page.tsx            # About page
│   ├── contact/page.tsx          # Contact page
│   ├── page.tsx                  # Homepage
│   └── layout.tsx                # Root layout
├── components/                   # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── GameTabFilter.tsx
│   └── ItemCard.tsx
├── hooks/
│   └── usePrices.ts              # Price fetching hook
├── data/
│   └── types.ts                  # Shared TypeScript types
├── lib/
│   └── utils.ts
├── public/images/                # Static assets
├── next.config.ts
├── open-next.config.ts           # Cloudflare adapter config
└── wrangler.jsonc                # Cloudflare Workers config
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | [Next.js 16](https://nextjs.org/) | React framework with App Router |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Declarative animations |
| **Deployment** | [Cloudflare Workers](https://workers.cloudflare.com/) | Edge computing platform |
| **Backend** | [PocketBase](https://pocketbase.io/) | SQLite-based backend |
| **ID Check** | Cloudflare Worker | MLBB account verification proxy |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ 
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

```bash
# Clone the repository
git clone https://github.com/komenome/portfolio.git
cd portfolio

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PB_URL` | ✅ | PocketBase backend URL | `https://your-pb-instance.com` |
| `MLBB_CHECKER_URL` | ✅ | MLBB ID verification worker | `https://your-worker-url.workers.dev` |

> ⚠️ **Note:** Never commit `.env.local` to Git. These values should be configured in your Cloudflare Dashboard for production.

### Development

```bash
# Start the development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build & Deploy

```bash
# Local production build
npm run build

# Preview Cloudflare build locally
npm run preview

# Deploy to Cloudflare Workers
npm run deploy
```

---

## 🔐 API Routes

### `POST /api/check-mlbb`

Verifies a Mobile Legends account via Cloudflare Worker proxy.

**Request Body:**
```json
{
  "gameId": "12345678",
  "zoneId": "3001"
}
```

**Response:**
```json
{
  "valid": true,
  "ign": "PlayerName",
  "country": "Malaysia",
  "available_tiers": ["50+50", "150+150"]
}
```

### `GET /api/prices`

Fetches game pricing data from PocketBase.

**Response:**
```json
[
  {
    "gameId": "mlbb-global",
    "gameName": "Mobile Legends",
    "currency": "Diamonds",
    "items": [...],
    "weeklyPass": [...],
    "doubleDiamond": [...]
  }
]
```

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#06060b` | Page background |
| `--accent-cyan` | `#00e5ff` | Primary CTAs, highlights |
| `--accent-purple` | `#b347ff` | Secondary accents |
| `--glass-border` | `rgba(255,255,255,0.06)` | Card borders |
| `--glass-bg` | `rgba(255,255,255,0.03)` | Card backgrounds |

### Typography

- **Headings:** Space Grotesk — Bold, modern geometric sans-serif
- **Body:** Inter — Clean, highly readable interface font

---

## 🧪 Checker Flow

```mermaid
flowchart TD
    A[User enters Game ID + Zone ID] --> B{Valid Format?}
    B -- No --> C[Show Validation Error]
    C --> A
    B -- Yes --> D[POST /api/check-mlbb]
    D --> E[Loading State]
    E --> F{Account Found?}
    F -- No --> G[Show Not Found Error]
    G --> H[Try Again Button]
    H --> A
    F -- Yes --> I[Display Account Details]
    I --> J[Show Region]
    J --> K[Show Double Diamond Tiers]
    K --> L[Contact Telegram CTA]

    style A fill:#1a1a2e,stroke:#00e5ff,color:#fff
    style E fill:#16213e,stroke:#7c4dff,color:#fff
    style I fill:#0f3460,stroke:#10b981,color:#fff
    style G fill:#331111,stroke:#ef4444,color:#fff
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by BINGO Game Shop**

<a href="https://t.me/KomeNome" target="_blank">
  <img src="https://img.shields.io/badge/Contact%20Us-Telegram-00e5ff?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram"/>
</a>

<br/><br/>

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:00e5ff,50:7c4dff,100:b347ff&height=100&section=footer"/>

</div>
