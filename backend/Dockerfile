#use the official node image
FROM node:22

#set the working directory in the container
WORKDIR /usr/src/app

#install dependencies
COPY package.json ./
RUN npm install

#copy the rest of the application code
COPY . .

#Expose the backend port
EXPOSE 5000

CMD [ "npm", "start" ]


