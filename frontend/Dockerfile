#use the official node image
FROM node:22 AS build

#set the working directory in the container
WORKDIR /app

#copy the pakage and install dependencies
COPY package.json ./
RUN npm install

#copy the rest of the application code
COPY . .

#build the application
RUN npm run build

#server app with nginx
FROM nginx:alpine

#copy the build folder to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
