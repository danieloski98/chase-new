
FROM node:16-alpine


COPY package*.json ./


RUN npm install 

RUN npm install -g react-scripts 


COPY . .


EXPOSE 80 


CMD [ "npm" , "run", "dev" ]