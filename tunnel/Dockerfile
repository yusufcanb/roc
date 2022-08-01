FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ./package*.json ./
COPY ./main.js ./

RUN npm install

EXPOSE 5000

CMD [ "node", "main.js" ]