import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


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

  sendMessage() {
    if (this.text.trim()) {
      this.messages.push(this.text); 
      this.text = '';
    }
  }
}
