import messaging from '@react-native-firebase/messaging';
import { IHttpResponse } from '@src/common/common.model';
import httpUtil from '@src/utils/http.util';
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  removeTenantId,
  setAccessToken,
  setRefreshToken,
} from '@src/utils/token.util';

import {
  EAppType,
  IIsTenantAvailableResponse,
  ILoginPayload,
  ILoginResponse,
  IRefreshTokenResponse,
  IRegisterPayload,
  IRegisterResponse,
  IUserInfo,
} from './auth.model';

class AuthService {
  async login(loginPayload: ILoginPayload) {
    const response = await httpUtil.request<IHttpResponse<ILoginResponse>>({
      url: '/api/auth/token-auth',
      method: 'POST',
      data: loginPayload,
    });

    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);

    return this.getUserInfo();
  }

  async register(registerPayload: IRegisterPayload) {
    const response = await httpUtil.request<IHttpResponse<IRegisterResponse>>({
      url: '/api/auth/register',
      method: 'POST',
      data: registerPayload,
    });

    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);

    return this.getUserInfo();
  }

  async logout() {
    try {
      await this.deleteTokenFromServer();
    } catch (error) {
      console.error('Delete FCM Token Error:', error);
    }

    removeAccessToken();
    removeRefreshToken();
    removeTenantId();
  }

  async refreshToken() {
    try {
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        return false;
      }

      const response = await httpUtil.request<
        IHttpResponse<IRefreshTokenResponse>
      >({
        url: '/api/auth/refresh-token',
        method: 'POST',
        data: {
          refreshToken,
        },
      });

      setAccessToken(response.data.accessToken);

      return true;
    } catch (error) {
      return false;
    }
  }

  async getUserInfo() {
    const accessToken = getAccessToken();

    if (!accessToken) {
      throw new Error('Access token is not found');
    }

    const response = await httpUtil.request<IHttpResponse<IUserInfo>>({
      url: '/api/auth/me',
      method: 'GET',
    });

    return response.data;
  }

  async isTenantAvailable({ tenancyName }: { tenancyName?: string }) {
    const response = await httpUtil.request<
      IHttpResponse<IIsTenantAvailableResponse>
    >({
      url: '/api/auth/is-tenant-available',
      method: 'POST',
      data: {
        tenancyName,
      },
    });

    return response.data;
  }

  async sendTokenToServer(token: string) {
    const response = await httpUtil.request<IHttpResponse<boolean>>({
      url: '/api/firebase/fcm/tokens',
      method: 'POST',
      data: {
        token,
        appType: EAppType.HOME_IOT,
      },
    });

    return response.data;
  }

  async deleteTokenFromServer() {
    const token = await this.getFcmToken();
    const response = await httpUtil.request<IHttpResponse<boolean>>({
      url: `/api/firebase/fcm/tokens/${token}`,
      method: 'DELETE',
    });

    return response.data;
  }

  async getFcmToken() {
    const token = await messaging().getToken();

    return token;
  }
}

const authService = new AuthService();

export default authService;
