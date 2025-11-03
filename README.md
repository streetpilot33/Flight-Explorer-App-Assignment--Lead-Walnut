# React + TypeScript + Vite

## Flight Explorer

A production-quality React application to search flights, view detailed flight info, and maintain a personal watchlist with persistent storage. It showcases clean architecture, advanced UI/UX (dark/light modes, glassmorphism, gradients), 3D/motion effects with Framer Motion, and solid testing with Vitest.

---

### 1) What you can do

- Search flights by flight number, airline, or airport IATA code (JFK, LAX, etc.)
- View results as responsive, animated cards
- Open a details modal (route, times, terminals/gates, duration, delay)
- Add/remove flights from a persistent Watchlist (localStorage)
- Filter results by airline, status, and time of day
- Use airport autocomplete with keyboard navigation
- Toggle dark/light theme (with persistence)

---

### 2) Tech stack

- React 18 + TypeScript + Vite
- Tailwind CSS (dark mode via `class` strategy) + custom tokens
- Framer Motion for animations and micro-interactions
- Axios for API calls
- Day.js for date/time formatting
- React Icons for UI icons
- Vitest + Testing Library + JSDOM for tests

---

### 3) API

- Base URL: `https://flight-explorer-api.codewalnut.com/`
- Endpoint: `GET /api/flights` → returns `{ flights: Flight[] }`
- Interactive docs: `https://flight-explorer-api.codewalnut.com/docs`
- No auth required

---

### 4) Getting started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Run tests:
   ```bash
   npm test
   ```

---

### 5) Scripts

- `npm run dev` — Start Vite dev server
- `npm run build` — Type-check and build for production
- `npm run preview` — Preview the production build
- `npm test` — Run Vitest (JSDOM)

---

### 6) Project structure

```
src/
  ├── components/      # UI components
  │   ├── DarkModeToggle.tsx
  │   ├── Filters.tsx
  │   ├── FlightCard.tsx
  │   ├── FlightDetails.tsx
  │   ├── FlightSearch.tsx
  │   ├── Hero.tsx
  │   ├── Select.tsx          # custom animated dropdown
  │   └── Watchlist.tsx
  ├── contexts/
  │   ├── ThemeContext.tsx    # dark/light toggle (persistent)
  │   └── WatchlistContext.tsx
  ├── services/
  │   └── flightService.ts    # API integration
  ├── tests/                  # Vitest suites
  │   ├── FlightSearch.test.tsx
  │   ├── WatchlistContext.test.tsx
  │   └── flightUtils.test.ts
  ├── types/
  │   └── flight.ts
  ├── utils/
  │   ├── airports.ts         # local data for autocomplete
  │   └── flightUtils.ts
  ├── styles/
  │   └── custom.css
  ├── App.tsx
  ├── index.css
  └── main.tsx
```

---

### 7) Architecture and component walkthrough (step-by-step)

- Theme (global)
  - `contexts/ThemeContext.tsx`: stores theme in localStorage and toggles `documentElement.classList` for Tailwind dark mode.
  - `components/DarkModeToggle.tsx`: animated toggle with springy hover/tap.

- Search & Autocomplete
  - `components/FlightSearch.tsx`:
    - Text input with validation; calls `onSearch`.
    - Airport autocomplete using `utils/airports.ts` with keyboard navigation.
    - Notifies parent when the dropdown is open so the Filters bar can hide.
    - Motion-powered submit button with subtle 3D hover.

- Filters
  - `components/Filters.tsx` + `components/Select.tsx`:
    - Custom animated dropdowns (Airline, Status, Time of day).
    - Light/dark styling with backdrop blur and motion.
    - Parent (`App.tsx`) applies pure functions to filter search results.

- Results (cards)
  - `components/FlightCard.tsx`:
    - Clean summary of each flight; watchlist star with add/remove.
    - Framer Motion enter and hover tilt (3D-ish) for delight.

- Watchlist
  - `contexts/WatchlistContext.tsx`: `add/remove/isInWatchlist` with localStorage persistence.
  - `components/Watchlist.tsx`: renders saved flights with staggered entrance.

- Details modal
  - `components/FlightDetails.tsx`:
    - AnimatePresence enter/exit transitions for backdrop and dialog.
    - Two-column layout (responsive) for Departure/Arrival.
    - Status/aircraft/duration/delay panels; status icons + themed badges.
    - Constrained height and centered vertically so it never touches edges.

- API service
  - `services/flightService.ts`: `getFlights()` via Axios; robust error handling in `App.tsx`.

- Utility layer
  - `utils/flightUtils.ts`: `formatDateTime`, status color mapping, status key, delay calculation.
  - `utils/airports.ts`: curated airport data for autocomplete.

---

### 8) Styling & theming

- Tailwind `darkMode: 'class'` and PostCSS enabled (Tailwind + Autoprefixer).
- Light mode focuses on readability (high-contrast text, reduced glow washout).
- Dark mode uses premium gradients, glassmorphism, and soft shadows.
- Grid is fully responsive (1/2/3 columns); containers use subtle depth.

---

### 9) Animations & micro-interactions

- Framer Motion across the app:
  - Hero: gradient blobs float subtly; section fades in.
  - Search: 3D hover on submit, animated dropdowns.
  - Filters: reveal on mount; custom Select with animated open/close.
  - Cards: springy enter + 3D tilt on hover.
  - Watchlist: container stagger for cascading cards.
  - Modal: AnimatePresence transitions for backdrop and dialog.

---

### 10) Error, loading, and empty states

- Loading spinner with themed colors.
- Error banner after API fetch failure.
- Empty results message with guidance.
- Empty watchlist panel.

---

### 11) Testing

- Setup
  - `vite.config.ts` configures vitest environment (jsdom) & `src/setupTests.ts` adds jest-dom matchers.
- Suites
  - `FlightSearch.test.tsx`: renders and triggers search callback
  - `WatchlistContext.test.tsx`: add/remove + localStorage persistence
  - `flightUtils.test.ts`: date formatting, status colors, delay calculation
- Run
  ```bash
  npm test
  ```

---

### 12) Accessibility & UX

- Keyboard navigation for autocomplete and custom selects (arrows/enter/esc).
- Focus-visible outlines, large tap targets on mobile.
- Reduced motion support: respects `prefers-reduced-motion`.

---

### 13) Performance

- Vite + Tailwind JIT build; code-splitting by default.
- Lightweight datasets for autocomplete; API request cached by app state during session.

---

### 14) Conventions & housekeeping

- Conventional commits (feat/fix/refactor/test/style/docs).
- `.gitignore` includes node_modules, build, coverage, editor files.
- No secrets committed; API is public.



---

### 15) Future enhancements (if desired)

- Server-side search & pagination (infinite scroll)
- Sort controls (departure time, duration, status priority)
- Offline caching / SW for API responses
- E2E tests with Playwright