# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Copy built application
COPY --from=build /app/dist/shopgame-frontend /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Generate self-signed SSL certificates if not present
RUN mkdir -p /etc/nginx/certs && \
    if [ ! -f /etc/nginx/certs/shopgame.crt ] || [ ! -f /etc/nginx/certs/shopgame.key ]; then \
      apk add --no-cache openssl && \
      openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/nginx/certs/shopgame.key \
        -out /etc/nginx/certs/shopgame.crt \
        -subj "/CN=localhost"; \
    fi

# Expose ports
EXPOSE 80
EXPOSE 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 