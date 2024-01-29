FROM node:14
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm run build --prod
EXPOSE 80
CMD ["npm","start"]
