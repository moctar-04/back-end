FROM node:16.14.2
WORKDIR /usr/code
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","run","index.js"]