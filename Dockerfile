# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install project dependencies
# Using npm ci is generally better for automated environments if package-lock is in sync, 
# but npm install is safer if lockfile is slightly out of sync.
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Expose the port the app runs on (Vite preview defaults to 4173)
EXPOSE 4173

# Command to run the application using vite preview
# Binding to 0.0.0.0 is necessary to access the server from outside the container in AWS
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
