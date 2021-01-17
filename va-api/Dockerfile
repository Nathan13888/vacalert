FROM node:fermium-alpine

USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Install app dependencies
COPY --chown=node package*.json ./

RUN npm install

# Bundle app source code
COPY --chown=node . .

RUN npm run prod

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}
CMD [ "node", "." ]
