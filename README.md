# 🟦 Skin Safe – Frontend

This is the **frontend** part of our graduation project **Skin Safe**, an AI-powered platform for skin cancer detection and awareness. This repo contains the client-side code written in React, powered by Vite and Tailwind CSS, with a modular architecture.

## 📦 Tech Stack

| Tech                                    | Description                                                               |
| --------------------------------------- | ------------------------------------------------------------------------- |
| **React**                               | Core UI library (JavaScript-based with some TypeScript for UI components) |
| **Vite**                                | Build tool and dev server                                                 |
| **Tailwind CSS v4**                     | Utility-first CSS framework                                               |
| **clsx** / **cva** / **tailwind-merge** | Utility libraries to manage dynamic class names                           |
| **Zustand**                             | Lightweight state management (for UI/local state)                         |
| **React Query**                         | Server-state management and API fetching                                  |
| **Headless UI**                         | Accessible, unstyled UI primitives (fully customized with Tailwind)       |
| **Heroicons**                           | Icon set (might be replaced with `react-icons` later)                     |
| **ESLint + Prettier**                   | Linting and formatting (with Tailwind plugin)                             |

---

## 🗂 Folder Structure

```
skin-safe-frontend/
├── public/                   # Static assets: images, fonts, icons, etc.
└── src/
    ├── components/
    │   ├── ui/               # Reusable UI components (Buttons, Inputs, etc.)
    │   └── [PageName]/       # Page-specific components grouped by page
    ├── features/
    │   └── [PageName]/       # Hooks & functions specific to each page
    ├── hooks/                # General custom hooks (shared across app)
    ├── pages/                # Main page components
    ├── services/
    │   ├── api/              # API request functions (used in features/)
    │   ├── i18n/             # Internationalization-related logic
    │   └── state/            # Shared global state definitions (e.g. Zustand stores)
    └── utils/                # General helper functions and constants
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/KhaledSaeed004/Skin-Safe-Frontend.git
cd Skin-Safe-Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the dev server

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 🔐 Environment Variables

Backend integration is **not set up yet** — once we finalize our backend services and APIs, this section will be updated with the required `.env` variables and instructions on how to set them up.

---

## 🧪 TypeScript Usage

Even though the project is primarily written in **JavaScript**, we use **TypeScript** _only_ in reusable `ui/` components. This improves auto-completion and type safety when importing these components across the app. No TypeScript setup is required by devs unless modifying these components.

---

## 🌱 Contributing

### Branching & Pull Requests

- Always create a **new branch** using the `dev/` prefix:
  ```bash
  git checkout -b dev/your-name
  ```
- Write clear commit messages.
- Open a pull/merge request with a **descriptive title and summary**.

---

## 🛠 Tooling & Linting

This repo includes:

- `eslint` for catching code issues
- `prettier` for consistent formatting
- Tailwind plugin for Prettier (`prettier-plugin-tailwindcss`)

To lint manually:

```bash
npm run lint
```

To format code:

```bash
npm run format
```

