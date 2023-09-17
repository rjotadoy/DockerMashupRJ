# Use an official Node.js runtime as the base image
FROM node:lts-alpine

# Create a directory for your app inside the container
WORKDIR /usr/src/app

# Copy package files and install required packages
COPY package*.json ./
RUN npm install

# Copy your app source tree and the frontend build folder into the working directory
COPY . .

# Specify the command to start your application
CMD ["node", "app.js"]

