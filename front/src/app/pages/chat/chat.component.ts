import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from '../../services/websocket.service';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  text: string = '';
  messages: string[] = [];

  constructor(private webSocketService: WebSocketService){}

  ngOnInit():void{
    this.webSocketService.connect();
    this.webSocketService['socket'].on('chat message', (msg: string) => {
      this.messages.push(msg);
    })
  }

  sendMessage():void {
    if (this.text.trim()) {
      this.webSocketService.sendMessage(this.text); 
      this.text = '';
    }
  }
}
