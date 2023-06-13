FROM node:18-alpine

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY . .

ENV PORT=

# Install dependencies
RUN npm install

# Expose port
EXPOSE $WPORT

# Start server
CMD [ "node", "server.js" ]