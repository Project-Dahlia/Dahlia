# syntax=docker/dockerfile:1

# docker build -t dahlia-frontend .
# docker build --no-cache --progress=plain -t dahlia-frontend .


# Use the official Node runtime as a parent image
FROM node:20.11.1-alpine3.14

# Set the working directory in the container
WORKDIR /frontend

# Copy dependencies lock to container
COPY package.json yarn.lock ./

# Set yarn version
RUN yarn set version 4.8.1

# Install dependencies
RUN yarn install

# Copy source files into container
COPY . .

ENV PORT 3000

EXPOSE $PORT

# Run compiled project
CMD yarn start