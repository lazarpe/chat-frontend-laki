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
  messages: {text: string, self: boolean}[] = [];
  constructor() { }

  ngOnInit() {
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    // @ts-ignore
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        this.messages.push({text: data, self: false});
        /*const element = document.createElement('li');
        element.innerText = data;
        element.style.background = 'white';
        element.style.padding =  '15px 30px';
        element.style.margin = '10px';
        // @ts-ignore
        document.getElementById('message-list').appendChild(element);*/
      }
    });
  }

  SendMessage() {
    this.socket.emit('message', this.message);
    this.messages.push({text: this.message, self: true});
    /*const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding =  '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    // @ts-ignore
    document.getElementById('message-list').appendChild(element);*/
    this.message = '';
  }
}
