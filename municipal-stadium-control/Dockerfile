FROM node:12.10.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN npm install --silent
RUN npm install react-scripts@3.1.1 -g --silent
RUN npm install --save-dev react-router-dom
RUN npm install --save-dev mysql
RUN npm install --save-dev jest

COPY . .

EXPOSE  3000

CMD [ "npm", "start" ]
