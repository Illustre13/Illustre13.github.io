# 🗄️ Database Setup Guide

Complete guide to set up your PostgreSQL database on Render.

---

## 📋 Step 1: Create Render PostgreSQL Database

### 1.1 Sign Up for Render
1. Go to [render.com](https://render.com)
2. Sign up with GitHub or email
3. Verify your email

### 1.2 Create New PostgreSQL Database
1. Click **"New +"** button in Render dashboard
2. Select **"PostgreSQL"**
3. Fill in the details:
   - **Name**: `portfolio-db` (or your preferred name)
   - **Database**: `portfolio` (auto-generated)
   - **User**: `portfolio_user` (auto-generated)
   - **Region**: Choose closest to you
   - **PostgreSQL Version**: 15 or 16 (latest)
   - **Plan**: **Free** (500MB storage, 90 days retention)
4. Click **"Create Database"**

### 1.3 Get Database Connection String
1. Wait for database to be created (~2-3 minutes)
2. On database page, find **"Connections"** section
3. Copy the **"External Database URL"** (starts with `postgresql://`)
4. It looks like: `postgresql://user:password@host:5432/database`

---

## 📋 Step 2: Configure Local Environment

### 2.1 Update `.env.local`
Add your database URL to `.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Email (already configured)
EMAIL_USER=ndahayosibertin17@gmail.com
EMAIL_APP_PASSWORD=your-app-password

# NextAuth
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3005
```

### 2.2 Generate NextAuth Secret
Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and paste it as `NEXTAUTH_SECRET` value.

---

## 📋 Step 3: Install Dependencies

```bash
npm install @prisma/client
npm install -D prisma
npm install bcryptjs
npm install -D @types/bcryptjs
```

---

## 📋 Step 4: Run Database Migrations

### 4.1 Generate Prisma Client
```bash
npx prisma generate
```

### 4.2 Create Migration
```bash
npx prisma migrate dev --name init
```

This will:
- ✅ Create all database tables
- ✅ Apply the schema to your database
- ✅ Generate Prisma Client

### 4.3 Seed Initial Data
```bash
npx prisma db seed
```

This will create:
- ✅ Admin user (your email with password: `admin123`)
- ✅ Sample skills
- ✅ Hero stats
- ✅ Sample project
- ✅ Sample blog post
- ✅ Sample experience
- ✅ Site settings

---

## 📋 Step 5: Update package.json

Add this to your `package.json`:

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

Install ts-node if not already installed:

```bash
npm install -D ts-node
```

---

## 📋 Step 6: Verify Database

### 6.1 Open Prisma Studio
```bash
npx prisma studio
```

This opens a visual database editor at `http://localhost:5555`

### 6.2 Check Your Data
You should see:
- ✅ 1 User (your admin account)
- ✅ 8 Skills
- ✅ 4 Hero Stats
- ✅ 1 Project
- ✅ 1 Blog Post
- ✅ 1 Experience
- ✅ 8 Settings
- ✅ 0 Contact Messages (empty initially)

---

## 📋 Step 7: Test Admin Login

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Go to: `http://localhost:3005/admin/login`

3. Login with:
   - **Email**: `ndahayosibertin17@gmail.com`
   - **Password**: `admin123`

4. You should see the admin dashboard! 🎉

---

## 🔧 Troubleshooting

### Connection Error
**Error**: `Can't reach database server`

**Solution**:
- Check DATABASE_URL is correct
- Ensure it includes `?sslmode=require` at the end
- Verify Render database is running (check dashboard)

### Migration Failed
**Error**: `Migration failed to apply`

**Solution**:
```bash
npx prisma migrate reset
npx prisma migrate dev
npx prisma db seed
```

### Prisma Client Not Generated
**Error**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
npx prisma generate
```

### Seed Script Error
**Error**: `ts-node not found`

**Solution**:
```bash
npm install -D ts-node
```

---

## 🚀 Next Steps

After successful setup:

1. ✅ **Change default password** in admin dashboard
2. ✅ Update sample data with your real information
3. ✅ Configure your site settings
4. ✅ Add your projects and blog posts
5. ✅ Test all CRUD operations

---

## 📊 Database Schema Overview

Your database now has these tables:

| Table | Purpose | Records |
|-------|---------|---------|
| User | Admin users | 1 |
| Post | Blog posts | 1 sample |
| Project | Portfolio projects | 1 sample |
| Skill | Your skills | 8 |
| Experience | Work/education history | 1 sample |
| HeroStat | Front page stats | 4 |
| Settings | Site configuration | 8 |
| ContactMessage | Contact form submissions | 0 |
| PageView | Analytics | 0 |
| Testimonial | Client testimonials | 0 |

---

## 💡 Pro Tips

1. **Backup Your Data**: Render free tier doesn't include automated backups
2. **Regular Exports**: Use `npx prisma db pull` to backup schema
3. **Prisma Studio**: Great for quick data edits during development
4. **Migration History**: Keep track in `prisma/migrations/` folder
5. **Connection Pooling**: For production, consider using PgBouncer

---

## 🎯 Production Deployment

For Netlify deployment, add environment variable:

1. Go to Netlify dashboard
2. Site settings → Environment variables
3. Add `DATABASE_URL` with your Render connection string
4. Add `NEXTAUTH_SECRET` with your generated secret
5. Redeploy your site

---

**You're all set! 🚀** Your database is ready for content management.