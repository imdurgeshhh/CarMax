# 🚗 CarMax — Car Marketplace

A modern, full-featured **Car Marketplace** web application where users can browse, list, and connect over car listings. Built with React 19, powered by a serverless Neon database, and deployed live on Vercel.

🌐 **Live Demo:** [car-marketplace-pink-xi.vercel.app](https://car-marketplace-pink-xi.vercel.app)

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Running the App](#-running-the-app)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🏎️ About

**CarMax** is a full-stack car marketplace platform that brings buyers and sellers together in one sleek, responsive interface. Users can sign up, post car listings with details and images, browse available cars, filter by various criteria, and message sellers directly through an integrated chat system.

### Why this project?

Buying or selling a car online often means navigating cluttered, outdated platforms. CarMax was built to offer a clean, fast, and modern alternative — one where the experience of finding or listing a car feels as smooth as the cars themselves.

### Who is it for?

- 🚘 **Car sellers** who want a quick and easy way to list their vehicles
- 🔍 **Car buyers** looking to browse and compare listings in a clean UI
- 💬 **Anyone** who wants a seamless in-app messaging experience with sellers
- 👨‍💻 **Developers** exploring real-world integration of Clerk, Neon DB, Drizzle ORM, and Sendbird

---

## ✨ Features

- 🔐 **Authentication** — Secure sign up, sign in, and session management via Clerk
- 🚗 **Car Listings** — Post, browse, and view detailed car listings with images
- 🔎 **Search & Filter** — Filter cars by make, model, price, and other attributes
- 💬 **In-App Messaging** — Real-time buyer-seller chat powered by Sendbird UIKit
- 🖼️ **Image Uploads** — Car images stored and served via Firebase Storage
- 🗄️ **Serverless Database** — Neon (PostgreSQL) with Drizzle ORM for type-safe queries
- 🌙 **Dark / Light Mode** — Theme switching with `next-themes`
- 📱 **Fully Responsive** — Mobile-first design using Tailwind CSS v4
- 🎨 **Polished UI** — Built with shadcn/ui components and Radix UI primitives
- ⚡ **Blazing Fast** — Vite + React 19 for instant hot reload and optimized builds

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 7 | Build tool & dev server |
| Tailwind CSS v4 | Utility-first styling |
| shadcn/ui | Pre-built accessible UI components |
| Radix UI | Headless UI primitives |
| React Router v7 | Client-side routing |
| Lucide React | Icon library |
| Embla Carousel | Image carousel for listings |
| next-themes | Dark/light mode support |
| Sonner | Toast notifications |

### Auth & Backend Services
| Technology | Purpose |
|---|---|
| Clerk | User authentication & session management |
| Neon (PostgreSQL) | Serverless relational database |
| Drizzle ORM | Type-safe SQL query builder |
| Firebase | Image/file storage |
| Sendbird UIKit | Real-time in-app chat |
| Axios | HTTP client for API requests |

### Dev Tools
| Technology | Purpose |
|---|---|
| ESLint | Code linting |
| Faker.js | Mock data generation for development |
| Drizzle Kit | Database migrations & schema management |

---

## 📁 Project Structure

```
CarMax/
├── configs/                   # App-level configuration files
├── drizzle/
│   └── meta/                  # Drizzle ORM migration metadata
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   └── ui/                # shadcn/ui components (Button, Tabs, Select, etc.)
│   ├── hooks/                 # Custom React hooks
│   ├── lib/
│   │   └── utils.js           # Utility functions (cn, etc.)
│   ├── pages/                 # Route-level page components
│   └── index.css              # Global styles & Tailwind CSS variables
├── components.json            # shadcn/ui configuration
├── drizzle.config.js          # Drizzle ORM + Neon DB configuration
├── eslint.config.js           # ESLint rules
├── index.html                 # App entry HTML
├── jsconfig.json              # JS path aliases (@/ → src/)
├── package.json
└── vite.config.js
```

---

## ✅ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) v9+

You will also need accounts on:

- [Clerk](https://clerk.com/) — for authentication
- [Neon](https://neon.tech/) — for the serverless PostgreSQL database
- [Firebase](https://firebase.google.com/) — for image storage
- [Sendbird](https://sendbird.com/) — for in-app chat

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/imdurgeshhh/CarMax.git
cd CarMax
```

### 2. Install dependencies

```bash
npm install
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory and add the following:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Neon Database
VITE_DATABASE_URL=your_neon_postgres_connection_string

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Sendbird
VITE_SENDBIRD_APP_ID=your_sendbird_app_id
```

> ⚠️ Never commit your `.env` file. It is already included in `.gitignore`.

---

## 🗄️ Database Setup

This project uses **Drizzle ORM** with a **Neon (PostgreSQL)** serverless database.

### Push the schema to your database

```bash
npm run db:push
```

### Open Drizzle Studio (visual DB browser)

```bash
npm run db:studio
```

---

## ▶️ Running the App

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

### Preview Production Build Locally

```bash
npm run preview
```

---

## 🚢 Deployment

This project is deployed on **Vercel**.

To deploy your own instance:

1. Push your code to a GitHub repository
2. Import the repository into [Vercel](https://vercel.com/)
3. Add all environment variables from your `.env` file in the Vercel dashboard
4. Deploy — Vercel will auto-detect Vite and configure the build automatically

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ for car enthusiasts and anyone who's ever struggled to find a decent vehicle listing online.
