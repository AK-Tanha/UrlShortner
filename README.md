# URL Shortener — User Web App

A modern, responsive **React** frontend for a full-stack URL shortener platform. Users can shorten links in one click, manage their links from a personal dashboard, track click analytics, and manage their profile — all with a polished, animated dark-mode UI.

This app is the public-facing half of a three-part system:

| Repo | Purpose |
|---|---|
| **UrlShortner** | This app — user-facing landing, auth, dashboard, and profile |
| [URL-Shortener-Backend](https://github.com/AK-Tanha/URL-Shortener-Backend) | Express + TypeScript REST API (auth, URLs, redirects) |
| [url-shortner-admin](https://github.com/AK-Tanha/url-shortner-admin) | SuperAdmin dashboard with cross-app SSO |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite | Build tool & dev server |
| React Router v7 | Client-side routing |
| Tailwind CSS v4 | Styling & theming |
| shadcn/ui (Base UI) | Accessible component system |
| lucide-react | Icons |

---

## Key Features

### Guest + Authenticated Experience
- **Instant shortening from the landing page** — unauthenticated visitors are seamlessly routed to sign-up with their URL preserved
- Tabbed **sign-in / sign-up** with form validation and error handling
- **Protected routes** guard the dashboard, link details, and profile

### Dashboard
- Create, view, and **copy short links** with one click
- Live **click counts** and active/inactive status per link
- **Delete links** inline with optimistic UI updates
- Role-aware UI — SuperAdmins get a one-click **Admin Panel** button

### Link Details
- Dedicated page with the full short URL, original URL, short code, click count, status, and expiry
- Copy-to-clipboard and delete actions

### Profile
- **Avatar upload/removal** with client-side validation (type + 2 MB size limit)
- Account details (name, email, role) surfaced read-only

### Resilient Auth & Session Handling
- Central API client (`api-client.js`) attaches tokens, **auto-refreshes expired access tokens** on 401, and **deduplicates concurrent refresh calls** via a shared promise so parallel requests don't race
- **Cross-app SSO session bridge** (`session-bridge.js`) securely shares the logged-in session with the admin panel via **`postMessage` with strict origin checks**, so SuperAdmins never re-login when opening the admin dashboard

---

## Architecture

```
src/
├── components/
│   ├── ui/              # shadcn/ui primitives (button, card, input, …)
│   ├── ProtectedRoute.jsx
│   ├── signInForm.jsx
│   └── signUPForm.jsx
├── context/
│   └── AuthContext.jsx  # Auth state, session persistence (localStorage)
├── layouts/             # App shell: Header, Footer
├── lib/
│   ├── api-client.js    # Fetch wrapper with token handling
│   └── session-bridge.js# SSO handoff to the admin panel
├── pages/
│   ├── landing.jsx      # Shorten-from-home + FAQ
│   ├── auth.jsx         # Login / register tabs
│   ├── dashboard.jsx    # Link management
│   ├── link.jsx         # Link details
│   ├── profile.jsx      # Avatar + account info
│   └── redirect-link.jsx# Client-side short-code redirect
└── App.jsx              # Router config & route guards
```

**Engineering highlights:**
- **Separation of concerns** — reusable API client, auth context, and UI primitives keep pages lean
- **Fault-tolerant auth flow** — silent token refresh with 401 retry and refresh-call deduplication
- **SSO by design** — cross-origin session transfer with origin validation instead of token duplication
- **Responsive + accessible** — mobile-first layouts and accessible shadcn/ui components

---

## Getting Started

**Prerequisites:** Node.js 18+, the backend API running locally

```bash
# 1. Clone
git clone git@github.com:AK-Tanha/UrlShortner.git
cd UrlShortner

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Set VITE_SHORT_URL and VITE_ADMIN_URL as needed

# 4. Run the dev server
npm run dev   # → http://localhost:5173
```

### Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (hot reload) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run preview` | Preview production build |

> In development, Vite proxies `/api` to the backend at `http://localhost:5002`, so no `VITE_API_URL` is needed locally.

---

## Deployment

Deployable to **Vercel** as a static site. Set `VITE_SHORT_URL` to the deployed short-link domain and `VITE_ADMIN_URL` to the admin panel's URL.

---

## License

MIT