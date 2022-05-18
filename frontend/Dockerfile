# BASE IMAGE
FROM node:16.15.0-alpine3.15 as base

######################
#### FRONTEND DEV ####
######################
FROM base as frontend-dev

WORKDIR /app

COPY package.json .

RUN yarn install --frozen-lockfile &&\
    rm -rf "$(yarn cache dir)"

COPY . .

EXPOSE 3000

RUN yarn build
CMD yarn dev --host 0.0.0.0

######################

FROM base as build

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile &&\
    yarn build

######################
### FRONTEND PROD ####
######################
FROM nginx:1.21.6-alpine as nginx
ENV NODE_ENV=production

WORKDIR /usr/share/nginx/html

COPY --from=build ./app/dist/ ./

RUN nginx -t

CMD nginx -g 'daemon off;'