import axios, {
  AxiosInstance,
  AxiosProgressEvent,
  AxiosRequestConfig,
  Method,
} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HOST_SERVER, HOST_SERVER_BACKUP} from '@env';
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY} from '@/configs/constant';
import {ImageProps} from '@/components/modals/choose-image-modal';
import {getNewAccessToken, isTokenExpired, saveTokens} from './token.util';
interface IHttpRequest {
  url: string;
  params?: any;
  data?: any;
  method: Method;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}
interface IApiMethod {
  GET: Method;
  POST: Method;
  PUT: Method;
  DELETE: Method;
}
export const axiosMethod: IApiMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

class HttpUtil {
  private readonly http: AxiosInstance;
  private readonly httpCheckHealth: AxiosInstance;
  private current_URL: string;

  constructor() {
    this.current_URL = HOST_SERVER;
    this.http = axios.create({
      // baseURL: HOST_SERVER,
      timeout: 15000,
    });
    this.httpCheckHealth = axios.create({
      timeout: 5000,
    });

    this.http.interceptors.request.use(
      async config => {
        const headers: any = config.headers;
        let baseURL: any = config.baseURL;
        let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
        const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

        if (!accessToken) {
          console.log('no token');
        }
        if (isTokenExpired(accessToken || '')) {
          console.log('token expired');
          const {newAccessToken, encryptedAccessToken} =
            await getNewAccessToken(refreshToken || '');

          saveTokens({
            accessToken: newAccessToken,
            encryptedAccessToken,
            refreshToken: refreshToken || '',
          });

          accessToken = newAccessToken;
        }

        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        if (!baseURL) {
          baseURL = this.current_URL;
        }

        return {...config, headers: headers, baseURL: baseURL};
      },
      error => {
        console.error('[axios]', error);
        return Promise.reject(error);
      },
    );
  }
  // checkHealth() {
  //   setInterval(async () => {
  //     const config: AxiosRequestConfig = {
  //       url: HOST_SERVER + '/api/services/app/Account/GetAllTenantName',
  //       method: 'GET',
  //     };

  //     const response = await this.httpCheckHealth.request({...config});
  //     if (response.status !== 200 && HOST_SERVER_BACKUP) {
  //       this.current_URL = HOST_SERVER_BACKUP;
  //     }
  //   }, 300000);
  // }

  async request({
    url,
    params,
    data,
    method,
    onUploadProgress,
  }: IHttpRequest): Promise<any> {
    const config: AxiosRequestConfig = {
      url,
      method,
      params,
      data,
      onDownloadProgress: onUploadProgress,
    };

    const response = await this.http.request(config);

    return response.data;
  }

  async uploadListImage({
    files,
    onUploadProgress,
  }: {
    files: any[];
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  }): Promise<any> {
    const formData = new FormData();

    files.forEach(file => {
      formData.append('files', file);
    });

    const config: AxiosRequestConfig = {
      url: '/UploadBatchImage',
      method: 'POST',
      data: formData,
      // baseURL: HOST_SERVER,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await this.http.request({...config, onUploadProgress});
    // console.log(response.data);

    return response.data;
  }
  async uploadImage({
    file,
    onUploadProgress,
  }: {
    file: ImageProps;
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  }): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const config: AxiosRequestConfig = {
      // url: '/api/FileUpload/UploadImage',
      url: '/UploadOneImage',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // baseURL: HOST_SERVER,
    };

    const response = await this.http.request({...config, onUploadProgress});
    // console.log(response);

    return response.data;
  }
  async uploadFile({
    file,
    onUploadProgress,
  }: {
    file: any;
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  }): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const config: AxiosRequestConfig = {
      // url: '/api/FileUpload/UploadFile',
      url: '/UploadOneFile',
      method: 'POST',
      data: formData,
      // baseURL: HOST_SERVER,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await this.http.request({...config, onUploadProgress});
    // console.log(response.data);

    return response.data;
  }

  getCurrentUrlHost() {
    return this.current_URL;
  }
}

export default new HttpUtil();
