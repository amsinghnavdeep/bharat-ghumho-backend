# Stage 1: Build Angular frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend files
COPY frontend/package.json frontend/package-lock.json ./

# Install dependencies and build
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps
COPY frontend/ ./
RUN npm run build

# Stage 2: Python backend with built frontend
FROM python:3.11-slim

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app/ ./app/
COPY main.py .

# Copy built frontend from stage 1
COPY --from=frontend-builder /app/frontend/dist/ ./frontend/dist/

# Expose port (Railway sets PORT env var, main.py reads it)
EXPOSE 8000

# Run the application
CMD ["python", "main.py"]