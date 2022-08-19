FROM node:14.18.0-slim

RUN mkdir -p /usr/src/app   

WORKDIR /usr/src/app

COPY package.json /usr/src/app

COPY .env /usr/src/app

RUN npm install prettier -g

RUN npm install 

COPY . /usr/src/app

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
