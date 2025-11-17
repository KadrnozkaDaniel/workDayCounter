# Workday Counter

A dark-themed React + Vite application that calculates how many working days and Czech public holidays fall within any month. The interface is localized in Czech and showcases a compact dashboard with quick navigation and an optional list of holiday labels.

## Features

- Month slider and material date picker that jump to any month/year combination.
- Real-time calculation of working days by filtering weekends and official Czech holidays.
- Holiday pills that surface relevant holidays within the currently selected month.
- Responsive, glassmorphic layout built with Material UI components and icons.
- Localization handled through `react-i18next` with Czech copy out of the box.

## Tech Stack

- React 19 + TypeScript, bootstrapped with Vite.
- Material UI (MUI) and @mui/x-date-pickers for theming and inputs.
- date-fns for date math, formatting, and Czech locale support.
- i18next/react-i18next for translations.
- React Router for routing (currently a single `Home` route).

## Getting Started

```bash
yarn
yarn dev
```

The dev server runs on the default Vite port (`http://localhost:5173`). The UI pulls all data locally, so no extra environment variables or APIs are required.

## Available Scripts

- `yarn dev` – start the Vite dev server with hot module replacement.
- `yarn build` – type-check via `tsc` and build the production bundle.
- `yarn preview` – serve the production build locally for verification.
- `yarn lint` – run ESLint with the configured React/TypeScript rules.

## Project Notes

- Holiday definitions live in `src/utils/constants.ts`, while the calculation helpers (`getCzechPublicHolidays`, `getWeekdaysInMonth`) are in `src/utils/date.ts`.
- Localization strings reside in `src/locales/cs.json`; plug in more languages by extending `src/locales/i18n.js`.
- UI theming is centralized in `src/theme.ts`, making it easy to adjust colors, typography, or border radii for different brands.
