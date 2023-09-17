FROM node:lts-alpine

# Set the NODE_ENV environment variable to "production"
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install production dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../

# Copy the frontend build folder into the working directory 
COPY build/ ./build/

# Expose port 8000
EXPOSE 8000

# Change the owner of the directory to "node"
RUN chown -R node /usr/src/app

# Change the user to "node"
USER node

# Specify the command to start your application
CMD ["node", "app.js"]
