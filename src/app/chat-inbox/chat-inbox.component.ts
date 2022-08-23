import {Component, OnInit} from '@angular/core';
import io from 'socket.io-client';

const SOCKET_ENDPOINT = 'chat-app-laki.herokuapp.com';
@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {
  socket: any;
  message: string = "";
  constructor() { }

  ngOnInit() {
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    // @ts-ignore
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        const element = document.createElement('li');
        element.innerText = data;
        element.style.background = 'white';
        element.style.padding =  '15px 30px';
        element.style.margin = '10px';
        // @ts-ignore
        document.getElementById('message-list').appendChild(element);
      }
    });
  }

  SendMessage() {
    this.socket.emit('message', this.message);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding =  '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    // @ts-ignore
    document.getElementById('message-list').appendChild(element);
    this.message = '';
  }
}
