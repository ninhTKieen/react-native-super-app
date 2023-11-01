import httpUtil, {axiosMethod} from '@/utils/http.util';
import {INotify} from './notify.model';

class NotifyServices {
  async getAllNotify({
    providerId,
    skipCount = 0,
  }: {
    skipCount?: number;
    providerId: number;
  }): Promise<INotify> {
    const url = '/api/services/app/NotificationNew/GetAllNotifications';

    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params: {
        skipCount,
        appType: 2,
        providerId,
      },
    });

    return {
      totalCount: response.result.data.totalCount,
      totalUnread: response.result.data.totalUnread,
      items: response.result.data.items,
    };
  }

  async markAsRead(id: string): Promise<boolean> {
    const url = '/api/services/app/NotificationNew/SetNotificationAsReadNew';

    const response = await httpUtil.request({
      url,
      method: axiosMethod.POST,
      data: {
        id,
      },
    });

    return response.result.success;
  }

  async markAsUnread(id: string): Promise<boolean> {
    const url = '/api/services/app/NotificationNew/SetNotificationAsUnreadNew';

    const response = await httpUtil.request({
      url,
      method: axiosMethod.POST,
      data: {
        id,
      },
    });

    return response.result.success;
  }

  async markAllAsRead(): Promise<boolean> {
    const url = '/api/services/app/NotificationNew/SetAllNotificationAsReadNew';

    const response = await httpUtil.request({
      url,
      method: axiosMethod.POST,
    });

    return response.result.success;
  }

  async deleteNotify(id: string): Promise<boolean> {
    const url = '/api/services/app/NotificationNew/DeleteNotificationBusiness';

    const response = await httpUtil.request({
      url,
      method: axiosMethod.DELETE,
      params: {
        id,
      },
    });

    return response.result.success;
  }

  async deleteAllNotify(): Promise<boolean> {
    const url =
      '/api/services/app/NotificationNew/DeleteAllNotificationsBusiness';

    const response = await httpUtil.request({
      url,
      method: axiosMethod.DELETE,
      params: {
        appType: 2,
      },
    });

    return response.result.success;
  }
}

export default new NotifyServices();
