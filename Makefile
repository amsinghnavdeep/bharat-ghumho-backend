# --- FIRST TIME (one command does everything) ---
setup:
	cp -n .env.example .env || true
	docker compose up -d postgres redis
	sleep 3
	docker compose --profile migrate run --rm migrate
	docker compose --profile seed run --rm seed
	docker compose --profile dev up -d
	@echo "🚀 Running at http://localhost:3000"

# --- DAILY DEV ---
dev-up:
	docker compose --profile dev up -d

dev-down:
	docker compose --profile dev down

dev-logs:
	docker compose --profile dev logs -f app-dev

# --- DB ONLY (if running app outside docker) ---
db-up:
	docker compose up -d postgres redis

db-down:
	docker compose down

# --- MIGRATIONS ---
migrate:
	docker compose --profile migrate run --rm migrate

seed:
	docker compose --profile seed run --rm seed

# --- CLEAN EVERYTHING ---
clean:
	docker compose down -v --remove-orphans

# --- PRODUCTION BUILD ---
build-prod:
	docker build --target production -t bharat-ghumho:latest .

# --- HELP ---
help:
	@echo "Available commands:"
	@echo "  make setup       - First time setup (DB + app)"
	@echo "  make dev-up      - Start development"
	@echo "  make dev-down    - Stop development"
	@echo "  make dev-logs    - Watch dev logs"
	@echo "  make db-up       - Start DB only (Postgres + Redis)"
	@echo "  make db-down     - Stop DB"
	@echo "  make migrate     - Run migrations"
	@echo "  make seed        - Seed database"
	@echo "  make clean       - Remove all containers and volumes"
	@echo "  make build-prod  - Build production Docker image"
