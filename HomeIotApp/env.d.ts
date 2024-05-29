declare module '@env' {
  export const API_ENDPOINT: string;
  export const UPLOAD_IMAGE_ENDPOINT: string;
  export const SOCKET_SEND_CHANNEL: string;
  export const SOCKET_RECEIVE_CHANNEL: string;
  export const SOCKET_SEND_COMMAND_CHANNEL: string;
  export const OPEN_WEATHER_API_KEY: string;
}

declare module 'react-native-config' {
  export interface IConfig {
    API_ENDPOINT: string;
    UPLOAD_IMAGE_ENDPOINT: string;
    SOCKET_SEND_CHANNEL: string;
    SOCKET_RECEIVE_CHANNEL: string;
    SOCKET_SEND_COMMAND_CHANNEL: string;
    OPEN_WEATHER_API_KEY: string;
  }

  export const Config: IConfig;
  export default Config;
}
