import { io, Socket as SocketType } from 'socket.io-client';
import ApiConstant from '../api/apiConstant';

export class SocketSingleton{
    socket: SocketType;

    constructor() {
     
        this.socket = io(ApiConstant.URL);
        this.socket.on('connect', () => {
          console.log('Connected to server admin page!.');
        });
        this.socket.on('error', (error) => {
          console.error('Socket connection error:', error);
        });
        this.socket.on('disconnect', () => {
          console.log('Disconnected from socket');
        });
    }

    getSocket() {
        return this.socket;
    }

    
}

const socketObj = new SocketSingleton()
export const Socket = socketObj.getSocket()