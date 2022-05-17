# BASE IMAGE
FROM node:16.15.0-alpine3.15 as base
RUN echo "PS1='\e[33;1m\u@container: \e[0;92m\w\e[0m\$ '" > /root/.bashrc
# adding bash and removing /bin/sh from image
RUN apk add --no-cache bash &&\
    rm /bin/sh && ln -s /bin/bash /bin/sh
# we are going to use the dir /home/node/app
ENV APP=/home/node/app
WORKDIR $APP
# changing the owner and group of working directory
RUN chown node:node $APP
# using the node user
USER node

# this customizes how the shell is displayed

#######################
##### BACKEND DEV #####
#######################
FROM base as backend-dev
# copying everything from the host to the container /home/node/app directory
COPY --chown=node:node . $APP/
# installing dependencies
RUN npm install
# starting nodemon
CMD npm run dev

#######################
#### BACKEND IMAGE ####
#######################
FROM base as backend
# copying everything from the host to the container /home/node/app directory
COPY --chown=node:node ./BACK/package.json ./BACK/package-lock.json ./BACK/index.js $APP/
# installing dependencies
RUN npm ci
# starting ts-node-dev to watch for changes
CMD npm run server

######################
#### FRONTEND DEV ####
######################
FROM base as frontend-dev
# copying the transpiled code generated in the development image to current working directory
COPY --chown=node:node $APP/dist/ $APP/dist/
# copying package.json and yarn.lock from host to container working directory
COPY --chown=node:node ./forntend/ $APP/
# installing only production dependencies and removing yarn cache
RUN yarn install --frozen-lockfile &&\
    rm -rf "$(yarn cache dir)" &&\
    yarn build
# starting the application with `node dist/index.js`
CMD yarn dev

######################
### FRONTEND IMAGE ###
######################
FROM base as frontend
ENV NODE_ENV=production
# copying the transpiled code generated in the development image to current working directory
COPY --chown=node:node --from=frontend-dev $APP/dist/ $APP/dist/
# copying package.json and yarn.lock from host to container working directory
COPY --chown=node:node package.json yarn.lock $APP/
# installing only production dependencies and removing yarn cache
RUN NODE_ENV=production yarn install --frozen-lockfile &&\
    rm -rf "$(yarn cache dir)"
# starting the application with `node dist/index.js`
CMD yarn start