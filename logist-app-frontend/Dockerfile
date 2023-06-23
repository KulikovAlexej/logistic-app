FROM node:18.16-alpine as build

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm install
COPY . .
RUN npm run build


FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/logist-app-frontend /usr/share/nginx/html
