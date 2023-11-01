import axios, {Method, AxiosRequestConfig, AxiosHeaders} from 'axios';

interface IApiMethod {
  GET: Method;
  POST: Method;
  PUT: Method;
  DELETE: Method;
}

interface IApiParams {
  url: string;
  method?: Method | 'GET';
  token?: string | null;
  params?: object | null;
  data?: object | null;
  headers?: object | null;
}

export const axiosMethod: IApiMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const axiosRequest = async ({
  url,
  method,
  token,
  params,
  data,
  headers,
}: IApiParams) => {
  const axiosConfig: AxiosRequestConfig = {
    url,
    params,
    method,
    data,
    headers: headers || {},
    timeout: 10000,
    onUploadProgress: progressEvent => console.log(progressEvent),
  };

  if (token) {
    (axiosConfig.headers as AxiosHeaders).Authorization = `Bearer ${token}`;
  }

  const response = await axios(axiosConfig);

  return response.data;
};
