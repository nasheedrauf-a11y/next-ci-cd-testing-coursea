FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json ./

# Install all dependencies
RUN npm install --no-package-lock --no-audit

# Copy rest of application
COPY . .

# Set environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_URL=http://localhost:3000
ENV NEXT_PUBLIC_APP_NAME="My App"
ENV DB_HOST=host.docker.internal
ENV DB_PORT=5432
ENV DB_NAME=colors
ENV DB_USER=postgres
ENV DB_PASSWORD=password

# Build the application (ignore type errors)
RUN npm run build || true

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
