# Personal Portfolio & Blog

A modern, full-stack portfolio website built with Next.js, TypeScript, and Prisma. Features include a dynamic project showcase, skills section, experience timeline, and a fully-featured blog with admin dashboard.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with beautiful animations
- **Project Portfolio**: Categorized project showcase with filtering
- **Skills Section**: Interactive skill categories with hover effects
- **Experience Timeline**: Visual representation of work history
- **Blog System**: Full CMS with rich text editor
- **Admin Dashboard**: Secure admin panel for content management
- **Authentication**: NextAuth.js for secure login
- **Database**: Prisma ORM with PostgreSQL/MySQL/SQLite support

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (React 18+)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Database**: Prisma ORM
- **Authentication**: NextAuth.js
- **Rich Text Editor**: React Quill
- **Icons**: Font Awesome
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or higher
- npm or yarn
- PostgreSQL (or MySQL/SQLite)
- Git

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/my-brand-new.git
cd my-brand-new
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/portfolio_db"
NEXTAUTH_SECRET="your-generated-secret-key"
NEXTAUTH_URL="http://localhost:3005"
```

**Generate a secure NEXTAUTH_SECRET:**

```bash
# On Unix/Linux/Mac
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 4. Set up the database

#### Option A: PostgreSQL (Recommended)

1. Install PostgreSQL:
   - **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - **Mac**: `brew install postgresql`
   - **Linux**: `sudo apt-get install postgresql`

2. Create a database:

```bash
# Access PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE portfolio_db;

# Exit
\q
```

#### Option B: MySQL

```env
DATABASE_URL="mysql://root:password@localhost:3306/portfolio_db"
```

#### Option C: SQLite (Development only)

```env
DATABASE_URL="file:./dev.db"
```

Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

### 5. Initialize Prisma

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

### 6. Create an admin user

Create a script `scripts/create-admin.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('your-admin-password', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin user created:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Run it:

```bash
npx ts-node scripts/create-admin.ts
```

### 7. Start the development server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3005](http://localhost:3005)

## 📁 Project Structure

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

## Contact
Email: ndahayosibertin17@gmail.com
GitHub: Illustre13
LinkedIn: ndahayo-s-bertin
#### Built with ❤️ by Bertin NDAHAYO SINGIZWA


