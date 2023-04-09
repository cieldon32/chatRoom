import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway {
  private logger: Logger = new Logger('ChatGateway');
  @WebSocketServer() private ws: Server;  // socket实例
  private connectCounts = 0               // 当前在线人数
  private allNum = 0                      // 全部在线人数
  private users: any = {}                 // 人数信息

  /**
   * 初始化
   */
  afterInit() {
    this.logger.log('websocket init ...');
  }

  /**
   * 链接成功
   */
  handleConnection(client: Socket) {
    this.connectCounts += 1
    this.allNum += 1
    this.users[client.id] = `user-${this.connectCounts}`
    this.ws.emit('enter', { name: this.users[client.id], allNum: this.allNum, connectCounts: this.connectCounts });
    client.emit('enterName', this.users[client.id]);
  }

  /**
   * 断开链接
   */
  handleDisconnect(client: Socket) {
    this.allNum -= 1
    this.ws.emit('leave', { name: this.users[client.id], allNum: this.allNum, connectCounts: this.connectCounts  });
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, data: any): void {
    this.ws.emit('message', {
      name: this.users[client.id],
      message: data
    });
  }

  @SubscribeMessage('name')
  handleName(client: Socket, data: any): void {
    this.users[client.id] = data
    client.emit('name', this.users[client.id]);
  }
}
