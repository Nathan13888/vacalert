# buill/indangular project using this node image
FROM node:fermium-alpine as builder

USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm install

COPY --chown=node . .

RUN npm run prod

FROM nginx:alpine

#USER nginx

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /home/node/app/dist/* .

#RUN mkdir -p /home/nginx/app
#WORKDIR /home/nginx/app
#COPY --from=builder --chown=nginx /home/node/app/dist .
#RUN chmod 755 -R ./*

EXPOSE 4200 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
