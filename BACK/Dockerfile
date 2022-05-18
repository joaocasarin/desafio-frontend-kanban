# BASE IMAGE
FROM node:16.15.0-alpine3.15 as base

#######################
##### BACKEND DEV #####
#######################
FROM base as backend-dev

WORKDIR /app
COPY package.json .

RUN npm install

COPY . .

CMD npm run dev

#######################
#### BACKEND IMAGE ####
#######################
FROM base as backend

WORKDIR /app

COPY package.json .

RUN npm ci

COPY . .

CMD npm run server