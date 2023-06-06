FROM node:18

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 8080

# Start server
CMD [ "node", "server.js" ]