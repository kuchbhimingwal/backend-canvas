import express from 'express'
import { WebSocketServer, WebSocket } from 'ws'

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });


let senderSocket: null | WebSocket = null;
let receiverSocket: null | WebSocket = null;


wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data:any) {
    const message = JSON.parse(data);
    if (message.type === 'sender') {
      console.log("sender assigned");
      senderSocket = ws;
    } else if (message.type === 'receiver') {
      console.log("receiver assigned");
      receiverSocket = ws;
    } else if (message.type === 'createLine') {
      if (ws !== senderSocket) {
        return;
      }
      receiverSocket?.send(JSON.stringify({ type: 'createLine', sdp: message.sdp }));
    }
  });

  ws.send('Hello! Message From Server!!');
});