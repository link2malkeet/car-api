#from what image you want to buid from.
FROM node:8
#directory which holds the application code
WORKDIR /usr/share/app
# Install app dependencies
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9090
CMD [ "npm", "start" ]