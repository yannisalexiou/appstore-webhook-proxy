# Use official Node.js LTS image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project files
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Default command to run the app
CMD ["node", "app.js"]
