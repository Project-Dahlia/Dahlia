# syntax=docker/dockerfile:1

# docker build -t backend .

# Use the official Node runtime as parent image
# https://github.com/nodejs/docker-node?tab=readme-ov-file#image-variants
FROM node:20.11.1-alpine

# Set working directory in container
WORKDIR /backend

# Copy dependencies lock to container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source files into container 
COPY . .

ENV PORT 3000

EXPOSE $PORT

# Run compiled project
CMD npm start
