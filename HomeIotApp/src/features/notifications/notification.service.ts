import {
  IHttpResponse,
  INewHttpResponseList,
  TBaseGetParams,
} from '@src/common/common.model';
import httpUtil from '@src/utils/http.util';

import {
  ENotificationGroupType,
  ENotificationStatus,
  INotification,
} from './notification.model';

class NotificationService {
  async getNotifications(
    params: {
      status?: ENotificationStatus;
      groupType?: ENotificationGroupType;
    } & TBaseGetParams,
  ) {
    const response = await httpUtil.request<
      INewHttpResponseList<INotification>
    >({
      url: '/api/notifications',
      method: 'GET',
      params,
    });

    return response.data;
  }

  async getNotificationCount(params: { groupType: ENotificationGroupType }) {
    const response = await httpUtil.request<
      IHttpResponse<{
        countRead: number;
        countUnread: number;
      }>
    >({
      url: '/api/notifications/count',
      method: 'GET',
      params,
    });

    return response.data;
  }

  async markAsRead(notificationId: number) {
    await httpUtil.request({
      url: `/api/notifications/${notificationId}`,
      method: 'PATCH',
      data: {
        status: ENotificationStatus.READ,
      },
    });
  }

  async deleteNotification(notificationId: number) {
    await httpUtil.request({
      url: `/api/notifications/${notificationId}`,
      method: 'DELETE',
    });
  }
}

export default new NotificationService();
