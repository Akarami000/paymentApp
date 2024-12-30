# Use a base Node.js image
FROM node:16

# Set the working directory
WORKDIR /app


# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies (and rebuild native modules)
RUN npm install --build-from-source

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Set the environment variable to production
ENV NODE_ENV=production

COPY config ./config
# Command to run the app
CMD ["npm", "start"]