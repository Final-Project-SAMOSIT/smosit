FROM node:17

RUN mkdir -p /usr/src/app   

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

COPY .env /usr/src/app

RUN npm install prettier -g

RUN npm install 

COPY . /usr/src/app

RUN npm run build

EXPOSE 3000

CMD [ "yarn", "dev" ]