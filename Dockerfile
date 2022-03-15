FROM node:12.22-alpine

# create destination directory
RUN mkdir -p /usr/src/yammi
WORKDIR /usr/src/yammi

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/yammi/
# RUN npm install -g yarn
RUN yarn install
RUN yarn run build

EXPOSE 8082

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8082

CMD [ "yarn", "start" ]
