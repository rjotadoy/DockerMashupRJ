# Use an official Node.js runtime as the base image
FROM node:lts-alpine

# Path in the container where the application files will go
WORKDIR /usr/src/app

# Copy in the package files and install required packages
COPY app/package*.json ./
RUN npm install

# Copy our app source tree and the frontend build folder into the working directory
COPY app/ ./
COPY build/ ./build/

# Specify the command to start your application
CMD ["node", "app.js"]

