FROM node:14 as BUILD

WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY . /app
RUN npm run build -- --prod --aot

FROM nginx

COPY --from=BUILD /app/dist/roc-ui /usr/share/nginx/html
COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
