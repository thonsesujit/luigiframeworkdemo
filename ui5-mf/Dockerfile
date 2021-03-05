FROM node:lts-alpine3.10
WORKDIR /usr/app
ADD package*.json .
RUN npm set @sap:registry=htdocktps://npm.sap.com
RUN npm install
COPY . .
EXPOSE 8080
ENTRYPOINT ["npm", "start"] 