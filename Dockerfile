FROM node:16.3.0-alpine as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn run build --production


FROM nginx:1.21.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./deployment/docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]