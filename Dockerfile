# Use the official Node.js image as a base image
FROM node:20.11.1-alpine AS base

# Set the working directory
WORKDIR /app

# Add package file and install dependencies
COPY package.json ./
RUN yarn install --verbose

# Generate prisma client
COPY prisma ./prisma/
RUN yarn prisma generate

# Copy source files and build the application with verbose output
COPY src ./src
COPY tsconfig.json ./
RUN yarn build

# Start a new stage from the base image
FROM node:20.11.1-alpine

# Set the working directory
WORKDIR /app

# Copy node_modules and build directory from the previous stage
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/src/app/app.js"]
