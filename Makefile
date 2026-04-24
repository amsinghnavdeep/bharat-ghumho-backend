# Bharat Ghumho Backend — Commands

# First-time setup (one command)
setup:
	cp -n .env.example .env || true
	docker compose up -d postgres redis
	sleep 5
	docker compose --profile migrate run --rm migrate
	docker compose --profile seed run --rm seed
	@echo "\n🚀 Database ready! Run 'make dev' to start the app.\n"

# Start dev (app runs outside Docker, DB in Docker)
dev:
	docker compose up -d postgres redis
	npm run dev

# Start everything in Docker
dev-docker:
	docker compose --profile dev up -d

# Stop
down:
	docker compose down

# Database
migrate:
	npx prisma migrate dev

seed:
	npx prisma db seed

studio:
	npx prisma studio

# Testing
test:
	npm test

# Clean everything
clean:
	docker compose down -v --remove-orphans
	@echo "🧹 Cleaned"

.PHONY: setup dev dev-docker down migrate seed studio test clean
