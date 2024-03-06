# syntax=docker/dockerfile:1

# docker build -t backend .

# Use the official Node runtime as parent image
# https://github.com/nodejs/docker-node?tab=readme-ov-file#image-variants
FROM node:18.19.0-alpine

# Set working directory in container
WORKDIR /Project-Dahlia/backend

# Copy dependencies lock to container
COPY package.json package-lock.json ./

# Set Yarn version
RUN npm set version 8.1.0

# Install dependencies
RUN npm install


# Copy source files into container 
COPY . .

ENV PORT 3000

EXPOSE $PORT

# Run compiled project

CMD npm start
