import authService from '@src/features/auth/auth.service';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import Config from 'react-native-config';

import { getAccessToken, getTenantId } from './token.util';

interface IHttpRequest {
  url: string;
  method: Method;
  data?: any;
  params?: any;
  contentType?: string;
}

class HttpUtil {
  private readonly http: AxiosInstance;
  private readonly httpUploadImg: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: Config.API_ENDPOINT,
      timeout: 30000,
    });

    this.httpUploadImg = axios.create({
      baseURL: Config.UPLOAD_IMAGE_ENDPOINT,
      timeout: 30000,
    });

    this.http.interceptors.request.use(
      (config) => {
        const headers: any = config.headers;
        const accessToken = getAccessToken();
        const tenantId = getTenantId();

        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }
        if (tenantId) {
          headers['Abp.TenantId'] = tenantId;
        }

        return { ...config, headers: config.headers };
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.http.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        const accessToken = getAccessToken();

        if (!accessToken) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401) {
          const success = await authService.refreshToken();

          if (success) {
            return this.http(error.config as AxiosRequestConfig);
          } else {
            await authService.logout();
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  async request<T>({
    url,
    params,
    data,
    method,
    contentType,
  }: IHttpRequest): Promise<T> {
    const config: AxiosRequestConfig = {
      url,
      method,
      params,
      data,
      headers: {
        'Content-Type': contentType || 'application/json',
      },
    };

    const response = await this.http.request(config);

    return response.data as T;
  }

  async uploadListImage({ files }: { files: any[] }): Promise<any> {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('file', file);
    });

    const config: AxiosRequestConfig = {
      url: '/api/files/upload-many',
      method: 'POST',
      data: formData,
      baseURL: Config.API_ENDPOINT,
    };

    const response = await this.http.request(config);

    return response.data;
  }

  async requestLogout<T>({
    url,
    params,
    data,
    method,
    contentType,
  }: IHttpRequest): Promise<T> {
    const config: AxiosRequestConfig = {
      url,
      method,
      params,
      data,
      headers: {
        'Content-Type': contentType || 'application/json',
      },
    };

    const response = await this.http.request(config);

    return response.data as T;
  }
}

const httpUtil = new HttpUtil();

export default httpUtil;
