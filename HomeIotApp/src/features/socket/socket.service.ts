import { storage } from '@src/common/mmkv.storage';
import { getAccessToken } from '@src/utils/token.util';
import Config from 'react-native-config';
import { Socket, io } from 'socket.io-client';

class SocketService {
  public socket: Socket;
  public accessToken: string = getAccessToken() as string;

  constructor() {
    this.socket = io(Config.API_ENDPOINT as string, {
      extraHeaders: {
        access_token: this.accessToken,
      },
    });
  }

  public start() {
    const token = getAccessToken();
    this.socket = io(Config.API_ENDPOINT as string, {
      extraHeaders: {
        access_token: token as string,
      },
    });
    this.socket.on('connect', () => {
      console.log('Socket connected: ', this.socket.connected);
      const currentHomeId = storage.getNumber('currentHomeId');
      if (currentHomeId) {
        this.send({
          channel: '/estates/join-room',
          data: {
            estateId: currentHomeId,
          },
        });
      }
    });
  }

  public stop() {
    this.socket.on('disconnect', () => {
      console.log('Socket disconnected: ', this.socket.disconnected);
    });
  }

  public send(params: { channel?: string; data: any }) {
    params.channel = params.channel || (Config.SOCKET_SEND_CHANNEL as string);
    console.log(params.data, 'send');
    this.socket.emit(params.channel, params.data);
  }

  public received(params: { channel?: string; callback: (data: any) => void }) {
    params.channel =
      params.channel || (Config.SOCKET_RECEIVE_CHANNEL as string);
    this.socket.on(params.channel, params.callback);
  }

  public offConnect(params: {
    channel?: string;
    callback?: (data: any) => void;
  }) {
    params.channel =
      params.channel || (Config.SOCKET_RECEIVE_CHANNEL as string);
    this.socket.off(params.channel, params.callback);
  }

  public disconnect() {
    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected: ', reason);
    });
  }
}

export default new SocketService();
