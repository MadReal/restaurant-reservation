# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# .env file

# Supabase config

SUPABASE_URL=""
SUPABASE_KEY=""
SUPABASE_JWT_SECRET=""

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.

# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# Connect to Supabase with PgBouncer.

POSTGRES_URL="" - TODO: add to end of varibale in supabase '&pgbouncer=true'

# Direct connection to the database. Used for migrations.

POSTGRES_URL_NON_POOLING=""

# EMAILS - RESEND

RESEND_API_KEY=""
ADMIN_EMAIL="email <email@email.com>"
