# My Portfolio

A modern personal portfolio website built with Next.js, TypeScript, and TailwindCSS. Features a clean, professional design with sections for projects, experience, and a personal blog.

## Features

- 🎨 Modern, responsive design with TailwindCSS
- ⚡ Server-side rendering with Next.js 
- 📝 Integrated blog system
- 💼 Project showcase and experience timeline
- 🎯 Personal brand-focused design

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Backend services

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
my-brand-new/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/        # Shared components (Button, Card, etc.)
│   │   ├── layout/        # Layout components (Header, Footer, Nav)
│   │   └── sections/      # Page sections (Hero, Experience, About)
│   ├── features/          # Feature-specific modules
│   │   ├── blog/          # Blog-related components and logic
│   │   └── projects/      # Project showcase components
│   ├── lib/              # Utility functions and helpers
│   ├── types/            # TypeScript type definitions
│   ├── styles/           # Global styles and Tailwind config
│   └── pages/            # Next.js pages and API routes
│       ├── api/          # Backend API endpoints
│       ├── blog/         # Blog pages
│       └── projects/     # Project pages
├── public/               # Static assets
└── content/             # Markdown/JSON content files
```

## Development

- `pages/` - Next.js pages with file-based routing
- `components/` - Modular, reusable React components
- `pages/api/` - Backend API routes for blog and project management
- `content/` - Content management (blog posts, projects data)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

MIT
