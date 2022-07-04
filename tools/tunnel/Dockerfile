FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# If you are building your code for production
RUN npm ci --only=production
COPY server.js /usr/src/app/server.js

EXPOSE 5000

CMD [ "node", "server.js" ]
