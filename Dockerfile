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

# Expose the port (Railway sets PORT env var)
EXPOSE 8000

# Make start script executable
RUN chmod +x start.sh

# Run the application using start script
CMD ["./start.sh"]
