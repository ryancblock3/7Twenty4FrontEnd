FROM node:16-slim as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build --prod
FROM nginx:stable-alpine
COPY --from=build /app/dist/724-front-end /usr/share/nginx/html
RUN sed -i 's/80/4200/g' /etc/nginx/conf.d/default.conf
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]