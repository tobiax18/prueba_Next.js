# Recipe App

A cooking recipe web application built with Next.js 15, TypeScript, and MongoDB. It allows users to explore a catalog of recipes, view details for each, and save their favorites with user authentication.

---

## Technologies Used

| Technology | Usage |
|---|---|
| **Next.js 15** | Main framework with App Router |
| **TypeScript** | Strict typing throughout the project |
| **MongoDB + Mongoose** | Database and ODM |
| **Material UI (MUI)** | Interface components |
| **Jose** | JWT signing and verification |
| **bcryptjs** | Password hashing |
| **Resend** | Welcome email delivery |

---

## Installation

```bash
git clone <repo-url>
cd recipe-app
npm install
cp .env.example .env.local
```

---

## Environment Variables

Edit `.env.local` with your values:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/recipe-app
NEXTAUTH_SECRET=secure-jwt-secret-minimum-32-characters
NEXTAUTH_URL=http://localhost:3000
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
```

**Obtaining keys:**
- **MongoDB URI**: Free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)
- **NEXTAUTH_SECRET**: `openssl rand -base64 32`
- **RESEND_API_KEY**: Sign up at [Resend](https://resend.com)

---

## Running the Project

```bash
npm run dev      # Development at http://localhost:3000
npm run build    # Production build
npm start        # Production server
```

Recipes are automatically seeded the first time you access the app.

---

## Folder Structure

```
src/
├── app/                    # Routes and pages (App Router)
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── favorites/          # Favorites page (protected)
│   ├── recipes/[id]/       # Recipe detail page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main catalog page
├── components/             # Reusable components
│   ├── Navbar.tsx
│   ├── RecipeCard.tsx
│   ├── RecipeList.tsx
│   └── AuthForm.tsx
├── services/               # Data access layer
│   ├── auth.service.ts
│   ├── recipe.service.ts
│   ├── favorite.service.ts
│   └── email.service.ts
├── models/                 # Mongoose schemas
├── lib/                    # DB connection, JWT, Resend
├── actions/                # Server Actions
└── types/                  # TypeScript interfaces
```

---

## Architectural Decisions

**Separation of Concerns**: All database logic lives in `services/`. Pages only consume services and never interact with MongoDB directly.

**Server Components**: Pages fetch data on the server, improving performance and security. Only interactive components use `'use client'`.

**JWT in HttpOnly cookies**: Manual authentication using `jose`. The token in an HttpOnly cookie prevents client-side JavaScript access (XSS protection).

**Server Actions**: Mutations (login, favorites) use Next.js Server Actions, eliminating the need for separate API endpoints.

**Automatic Seeding**: Recipes are automatically inserted if the collection is empty, without requiring external scripts.

---

Created by Tobías Atehortúa for educational purposes.

