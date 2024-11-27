import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket!: Socket;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000;

  connect(): void {
    // Conexión al servidor WebSocket (asegúrate de usar HTTPS/WSS en producción)
    this.socket = io('wss://localhost:3000', {
      secure: true,
      rejectUnauthorized: false, // Solo para pruebas con certificados auto-generados
    });

    this.socket.on('connect', () => {
      console.log('Conexión establecida con el servidor.');
      this.reconnectAttempts = 0;
    });

    this.socket.on('chat message', (msg) => {
      console.log('Mensaje recibido:', msg);
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor.');
      this.attemptReconnect();
    });
  }

  sendMessage(message: string): void {
    if(this.socket && this.socket.connected){
      this.socket.emit('chat message', message);
    }else{
      console.info ('No se puede enviar el mensaje: no hay conexión.');
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        console.log(`Intentando reconectar... (Intento ${this.reconnectAttempts + 1})`);
        this.reconnectAttempts++;
        this.connect();
      }, this.reconnectInterval);
    } else {
      console.error('Se alcanzó el límite máximo de intentos de reconexión.');
    }
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
