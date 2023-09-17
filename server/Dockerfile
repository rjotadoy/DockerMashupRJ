# Use an official Node.js runtime as the base image
FROM node:lts-alpine

# Set the NODE_ENV environment variable to "production"
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install production dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent

# Copy the frontend build folder into the working directory
COPY build/ ./build/

# Copy the application code into the working directory
COPY app.js .

# Expose the port your application listens on
EXPOSE 8000

# Change the owner of the directory to "node"
RUN chown -R node /usr/src/app

# Change the user to "node"
USER node

# Specify the command to start your application
CMD ["node", "app.js"]

