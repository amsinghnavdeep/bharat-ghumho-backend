# Cache buster - change this value to force a full rebuild
ARG CACHE_DATE=2026-05-10-v2

FROM python:3.11-slim

# Install Node.js for frontend build
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency files first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the entire project
COPY . .

# Build the Angular frontend
RUN cd frontend && npm install && npm run build

# Expose the port
EXPOSE 8000

# Run the application (main.py reads PORT from environment)
CMD ["python", "main.py"]
