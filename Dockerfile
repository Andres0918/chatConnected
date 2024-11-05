FROM node:22

WORKDIR /app

COPY front ./front
COPY backend ./backend

WORKDIR /app/front
RUN npm install && npm run build

RUN mkdir -p /app/backend/public && \
    cp -r /app/front/dist/* /app/backend/public

WORKDIR /app/backend
RUN npm install

EXPOSE 3000 5000

CMD ["node", "index.js"]