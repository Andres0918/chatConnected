import express from 'express'
import logger from 'morgan'
import path from 'path'
import { Server } from 'socket.io'
import { createServer } from 'node:https'
import fs from 'fs';
import selfsigned from 'selfsigned';

const port = process.env.PORT ?? 3000

const pems = selfsigned.generate();

const app = express()
const server = createServer({key: pems.private, cert: pems.cert}, app);
const io = new Server(server, {
  connectionStateRecovery: {
    maxDisconnectionDuration: 15000, 
    skipMiddlewares: true,
  }
})

io.on('connection', (socket)=> {
  console.log('A new user has connected');

  socket.on('disconnect', () => {
    console.log('Un usuario se desconecto');
  })

  socket.on('chat message', (msg) => {
    console.log(msg);
    io.emit('chat message', msg);
  });
});

app.use(logger('dev'));

const angularDistPath = path.join(process.cwd(), '../front/dist/chat-connected/browser/chat');
app.use(express.static(angularDistPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(angularDistPath, 'index.html'))
});

server.listen(port, () =>{
  console.log(`Server running on port ${port}`)
});