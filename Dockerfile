# build stage
FROM node:8-alpine as builder
WORKDIR /app
ARG NPM_TOKEN
ARG NPM_AUTH_TOKEN
COPY .npmrc .
COPY package.json package.json

#RUN cat .npmrc
#RUN npm install @1000ml-io/vue3-ui@0.0.2

RUN npm install
RUN rm -f .npmrc

#RUN npm install
#RUN npm install https://npm.pkg.github.com/@1000ml-io/vue3-ui@0.0.2
#RUN npm install https://npm.pkg.github.com/@1000ml-io/assets@0.0.2
#RUN npm install @1000ml-io/vue3-ui@0.0.2
#RUN npm install @1000ml-io/assets@0.0.2

COPY . .
RUN npm run build

# production stage
FROM nginx:latest as production-stage
COPY prod_nginx.conf /etc/nginx/nginx.conf
COPY compose_nginx.conf /etc/nginx/compose_nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
