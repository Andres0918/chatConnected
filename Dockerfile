FROM node:16

WORKDIR /app

COPY FRONT ./front
COPY BACK ./backend

WORKDIR /app/front
RUN npm install && npm run build

RUN mkdir -p /app/backend/public && \
    cp -r /app/front/dist/front/* /app/backend/public

WORKDIR /app/backend
RUN npm install

EXPOSE 3000 5000

CMD ["node", "serve.js"]