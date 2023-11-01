import httpUtil, {axiosMethod} from '@/utils/http.util';
import {IChangePasswordForm, IChangePasswordPayload} from './profile.model';
class ProfileApi {
  async updateProfile(data: any, userId: number): Promise<any> {
    data.id = userId;
    data.isActive = true;
    try {
      const url = '/api/services/app/UserDefault/Update';

      const response = await httpUtil.request({
        method: axiosMethod.PUT,
        url,
        data,
      });

      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  }

  async changePassword(params: IChangePasswordForm): Promise<any> {
    const data: IChangePasswordPayload = {
      currentPassword: params.currentPassword,
      newPassword: params.newPassword,
    };

    try {
      const url = '/api/services/app/User/ChangePassword';

      const response = await httpUtil.request({
        method: axiosMethod.POST,
        url,
        data,
      });

      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  }
}

export default new ProfileApi();
