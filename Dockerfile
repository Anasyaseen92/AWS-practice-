# Use official Node.js runtime as a parent image
FROM node:20-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY server/package*.json ./server/

# Install dependencies
RUN cd server && npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Change to server directory and run the server
WORKDIR /app/server

# Start the application
CMD ["node", "server.js"]
