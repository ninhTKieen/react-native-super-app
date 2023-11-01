import {HOST_SERVER} from '@env';
import {
  IAuthenticateResponse,
  ICheckTenantAvailableRequest,
  ICheckTenantAvailableResponse,
  ILoginPayload,
  IRegisterPayload,
  IUser,
} from '@/features/auth/auth.model';

import {axiosRequest, axiosMethod} from '@/utils/api.util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import httpUtil from '@/utils/http.util';

class AuthenApi {
  apiEndPoint: string;
  constructor() {
    this.apiEndPoint = HOST_SERVER;
  }

  async login({
    userNameOrEmailAddress,
    password,
  }: ILoginPayload): Promise<IAuthenticateResponse> {
    const url = `${this.apiEndPoint}/api/TokenAuth/Authenticate`;
    const data = {
      userNameOrEmailAddress,
      password,
      rememberClient: true,
    };

    const response = await axiosRequest({
      url,
      method: axiosMethod.POST,
      data,
    });

    return {
      accessToken: response.result.accessToken,
      encryptedAccessToken: response.result.encryptedAccessToken,
      refreshToken: response.result.refreshToken,
      emailAddress: response.result.emailAddress,
      userId: response.result.userId,
    };
  }

  async getUserInfo(): Promise<IUser> {
    const url = '/api/services/app/User/GetDetail';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
    });

    return response.result;
  }

  async getMeWithToken({as}: {as: string}): Promise<IUser> {
    const url = `${this.apiEndPoint}/api/services/app/User/GetDetail`;
    const response = await axiosRequest({
      url,
      method: axiosMethod.GET,
      headers: {
        Authorization: `Bearer ${as}`,
      },
    });

    return response.result;
  }

  async getTenant({
    tenancyName,
  }: ICheckTenantAvailableRequest): Promise<ICheckTenantAvailableResponse> {
    const url = `${this.apiEndPoint}/api/services/app/Account/IsTenantAvailable`;
    const data = {
      tenancyName,
    };

    const response = await axiosRequest({
      url,
      method: axiosMethod.POST,
      data,
    });

    return response.result;
  }

  async register({
    emailAddress,
    name,
    password,
    userName,
    tenantId,
    surname,
  }: IRegisterPayload): Promise<any> {
    const url = `${this.apiEndPoint}/api/services/app/Account/Register`;
    const data = {
      emailAddress,
      name,
      password,
      userName,
      surname,
    };

    let headers;
    if (tenantId !== 0) {
      headers = {
        'abp.tenantId': tenantId,
        'Content-Type': 'application/json',
      };
    } else {
      headers = {};
    }

    const response = await axios({
      url,
      method: axiosMethod.POST,
      data,
      headers,
      timeout: 30000,
    });

    return response.data;
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('accessToken');
  }

  async logoutFCM(data: {token: string}): Promise<void> {
    const urlFCM = '/api/services/app/FcmToken/LogoutFcmToken';
    const url = '/api/TokenAuth/LogOut';
    if (!!data.token) {
      try {
        const responsefcm = await httpUtil.request({
          url: urlFCM,
          method: axiosMethod.POST,
          data: data,
        });
      } catch (error: any) {
        console.log('[call log out fcm error]', error.message);
      }
    }

    const resLogout = await httpUtil.request({
      url: url,
      method: axiosMethod.GET,
    });

    return resLogout.result;
  }

  async pushNotificationRegisterToTenant(data: {token: string}): Promise<void> {
    const url = '/api/services/app/FcmToken/CreateFcmToken';

    const response = await httpUtil.request({
      url,
      method: axiosMethod.POST,
      data: {
        ...data,
        tenantId: 0,
        deviceId: '',
        deviceType: 0,
        appType: 2,
      },
    });

    return response.result;
  }

  async sendPasswordResetCode(data: {
    emailAddress: string;
  }): Promise<{userId: number}> {
    const url = `${this.apiEndPoint}/api/services/app/Account/SendPasswordResetCode`;
    const response = await axiosRequest({
      url,
      method: axiosMethod.POST,
      data,
    });
    return response.result;
  }

  async resetCode(data: {
    userId: number;
    resetCode: string;
    password: string;
  }): Promise<void> {
    const url = `${this.apiEndPoint}/api/services/app/Account/ResetPassword`;
    const response = await axiosRequest({
      url,
      method: axiosMethod.POST,
      data,
    });
    return response.result;
  }
}

export default new AuthenApi();
