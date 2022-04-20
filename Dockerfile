# Use official nodejs image as base image
FROM node:14

# Use this path as the default location for all subsequent commands
WORKDIR /app

# Install PM2. A daemon process manager that will help you manage and keep your application online 24/7
RUN npm install --global pm2

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy everything from the folder that dockerfile exists to default location (currently /app)
COPY ./ ./

# Build the app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Use user node
USER node

# Run the app with pm2
CMD [ "pm2-runtime", "npm", "--", "start" ]