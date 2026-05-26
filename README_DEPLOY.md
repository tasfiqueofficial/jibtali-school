# Deployment Guide for Jibtali School Management System

This project is now 100% ready for production deployment using **PostgreSQL**.

### 1. Database Setup (DONE ✅)
I have already connected your project to your **Neon PostgreSQL** database and initialized the schema.
- **Connection String:** Provided and saved in `.env`.
- **Status:** Schema pushed and Admin seeded.

### 2. Deployment on Vercel (Next Step)
1. **Push your code to GitHub.**
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. **Environment Variables:** Add these 3 variables in the Vercel dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `AUTH_SECRET`: Run `openssl rand -base64 32` or type a long random string.
   - `NEXTAUTH_URL`: `https://your-project-name.vercel.app` (Your live URL).
5. Click **Deploy**.

### 3. First-Time Database Setup
Once deployed, you need to sync the database schema and create the admin account. You can do this by running these commands from your local machine (connected to the same `DATABASE_URL`):

```bash
# Push the schema to the cloud database
npx prisma db push

# Create the initial admin account
npx prisma db seed
```

### 4. Admin Credentials
After seeding, log in with:
- **Email:** `admin@jibtalischool.edu.bd`
- **Password:** `admin123`

---
**Note:** The system is built with Next.js 15, Tailwind CSS, and Prisma. It is fully responsive and optimized for both desktop and mobile.
