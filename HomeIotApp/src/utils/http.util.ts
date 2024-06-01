import authService from '@src/features/auth/auth.service';
import ky, { KyInstance } from 'ky';
import Config from 'react-native-config';

import { getAccessToken, getTenantId } from './token.util';

interface IHttpRequest {
  url: string;
  method:
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'patch'
    | 'head'
    | 'options'
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'HEAD'
    | 'OPTIONS'
    | 'Get'
    | 'Post'
    | 'Put'
    | 'Delete'
    | 'Patch'
    | 'Head'
    | 'Options';
  data?: any;
  params?: any;
  contentType?: string;
}

console.log(Config.API_ENDPOINT);

class HttpUtil {
  private readonly http: KyInstance;
  private readonly httpUploadImg: KyInstance;

  constructor() {
    this.http = ky.create({
      prefixUrl: Config.API_ENDPOINT,
      timeout: 30000,

      hooks: {
        beforeRequest: [
          (request) => {
            const headers = request.headers;
            const accessToken = getAccessToken();
            const tenantId = getTenantId();

            if (accessToken) {
              headers.set('Authorization', `Bearer ${accessToken}`);
            }

            if (tenantId) {
              headers.set('Abp.TenantId', tenantId);
            }
          },
        ],
        afterResponse: [
          async (request, _options, response) => {
            if (response.status === 401) {
              const accessToken = getAccessToken();

              if (accessToken) {
                const success = await authService.refreshToken();

                if (success) {
                  return this.http(request);
                } else {
                  await authService.logout();
                }
              }
            }
          },
        ],
      },
    });

    this.httpUploadImg = ky.create({
      prefixUrl: Config.UPLOAD_IMAGE_ENDPOINT,
      timeout: 30000,
    });
  }

  private sanitizeUrl(url: string): string {
    return url.startsWith('/') ? url.slice(1) : url;
  }

  async request<T>({
    url,
    params,
    data,
    method,
    contentType,
  }: IHttpRequest): Promise<T> {
    const options: Record<string, any> = {
      method,
      searchParams: params,
      json: data,
      headers: {
        'Content-Type': contentType || 'application/json',
      },
    };

    if (contentType === 'multipart/form-data') {
      options.body = data;
      delete options.json;
      delete options.headers['Content-Type'];
    }

    url = this.sanitizeUrl(url);

    let response;
    try {
      response = await this.http(url, { ...options, method }).json<T>();
    } catch (error) {
      throw error;
    }

    return response;
  }

  async uploadListImage({ files }: { files: any[] }): Promise<any> {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('file', file);
    });

    const response = await this.httpUploadImg
      .post('api/files/upload-many', {
        body: formData,
      })
      .json();

    return response;
  }

  async requestLogout<T>({
    url,
    params,
    data,
    method,
    contentType,
  }: IHttpRequest): Promise<T> {
    const options: Record<string, any> = {
      method,
      searchParams: params,
      json: data,
      headers: {
        'Content-Type': contentType || 'application/json',
      },
    };

    if (contentType === 'multipart/form-data') {
      options.body = data;
      delete options.json;
      delete options.headers['Content-Type'];
    }

    const response = await this.http(url, options).json<T>();
    return response;
  }
}

const httpUtil = new HttpUtil();

export default httpUtil;
