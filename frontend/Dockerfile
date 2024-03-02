# syntax=docker/dockerfile:1

# docker build -t dahlia-frontend .
# docker build --no-cache --progress=plain -t dahlia-frontend .


# Use the official Node runtime as a parent image
FROM node:20.11.1-alpine

# Set the working directory in the container
WORKDIR /frontend

# Copy dependencies lock to container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source files into container
COPY . .

# Build Next.js app
RUN npm run build

ENV PORT 3000

EXPOSE $PORT

# Run compiled project
CMD npm run start
