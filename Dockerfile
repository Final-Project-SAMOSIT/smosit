FROM node:16.15.1

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

COPY yarn.lock /usr/src/app

COPY .env /usr/src/app

RUN yarn

RUN yarn add prettier -g

COPY . /usr/src/app

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
