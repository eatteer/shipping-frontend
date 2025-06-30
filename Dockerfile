# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install ALL dependencies (development and production)
RUN npm install

# Copy all code
COPY . .

ENV VITE_API_BASE_URL="http://127.0.0.1:8080"

RUN npm run build

# Stage 2: Serve the application
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the build from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]