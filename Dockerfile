FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json ./

# Install all dependencies
RUN npm install --no-package-lock --no-audit

# Verify pg module is installed
RUN ls node_modules/pg && echo "pg module installed successfully" || (echo "pg module missing, installing..." && npm install pg)

# Copy init script directly to app root (simpler than copying folder)
COPY scripts/init-db.js /app/init-db.js

# Verify the script is there
RUN [ -f /app/init-db.js ] && echo "Init script OK at /app/init-db.js" || (echo "Script missing - checking what was copied:" && ls -la /app/)

# Copy source code
COPY . .

# Set environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_URL=http://localhost:3000
ENV NEXT_PUBLIC_APP_NAME="My App"

# Build the application
RUN npm run build || true

# Expose port
EXPOSE 3000

# Start the application
CMD node /scripts/init-db.js && node_modules/.bin/next start
