FROM node:17

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Set NODE_OPTIONS environment variable as a workaround for OpenSSL issues
ENV NODE_OPTIONS=--openssl-legacy-provider

# Ensure proper network settings
EXPOSE 3000

# Use a more explicit command with host binding
CMD ["npm", "start"] 