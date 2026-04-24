# Bharat Ghumho API 🇮🇳✈️

India-centric global flight and hotel booking platform.

## Tech Stack

- **Runtime:** Node.js 20+ with TypeScript
- **Framework:** Express.js 4
- **Database:** PostgreSQL 16 (Prisma ORM)
- **Cache:** Redis 7
- **APIs:** Amadeus (flights/hotels), Stripe (payments), Twilio (notifications)
- **Auth:** JWT with refresh token rotation, Google/Apple OAuth

## Quick Start

```bash
# 1. Clone and install
git clone https://github.com/amsinghnavdeep/bharat-ghumho-backend.git
cd bharat-ghumho-backend
npm install

# 2. Setup environment
cp .env.example .env
# Fill in your API keys

# 3. Start database (Docker)
docker compose up -d postgres redis

# 4. Run migrations and seed
npx prisma migrate dev --name init
npx prisma db seed

# 5. Start dev server
npm run dev
```

Server runs at `http://localhost:4000`
Swagger docs at `http://localhost:4000/api-docs`

## API Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | /api/auth/register | Register | No |
| POST | /api/auth/login | Login | No |
| POST | /api/auth/google | Google OAuth | No |
| POST | /api/auth/apple | Apple OAuth | No |
| GET | /api/flights/search | Search flights | Optional |
| POST | /api/flights/price | Confirm price | Optional |
| GET | /api/hotels/search | Search hotels | Optional |
| POST | /api/bookings | Create booking | Yes |
| GET | /api/bookings | List bookings | Yes |
| POST | /api/payments/create-intent | Create payment | Yes |
| POST | /api/payments/webhook | Stripe webhook | No |
| GET | /api/users/me | Get profile | Yes |
| PUT | /api/users/me | Update profile | Yes |
| POST | /api/price-alerts | Create alert | Yes |
| GET | /api/admin/stats | Dashboard stats | Admin |

## Project Structure

```
src/
├── config/      # Database, Redis, Amadeus, Stripe, Twilio, S3, Email
├── controllers/ # Request handlers (12 controllers)
├── middleware/   # Auth, error handling, rate limiting, validation, upload
├── models/      # Prisma type re-exports
├── routes/      # Express routes (12 route files)
├── services/    # Business logic (8 services)
├── utils/       # Logger, errors, validators, helpers, constants
├── jobs/        # Cron jobs (price alerts, reminders, cleanup)
├── types/       # TypeScript types and declarations
└── app.ts       # Express application entry point
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Start production server |
| `npm test` | Run tests |
| `npx prisma studio` | Open database GUI |
| `npx prisma migrate dev` | Run migrations |
| `docker compose up -d` | Start Postgres + Redis |

## License

Private — Bharat Ghumho
