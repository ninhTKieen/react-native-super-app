import {ICustomer, IMessage, IPageMessage} from '@/features/chat/chat.model';

import httpUtil, {axiosMethod} from '@/utils/http.util';

class ChatApi {
  async getMessage(params: {
    userId?: number;
    tenantId?: number;
    providerId?: number;
    skipCount?: number;
  }): Promise<IPageMessage> {
    const url =
      '/api/services/app/ProviderBusinessChat/GetBusinessChatMessages';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params: params,
    });

    return {
      data: response.result.data.reverse(),
      totalRecords: response.result.totalRecords,
    };
  }
  async getListCustomer(params: {
    providerId?: number;
    keywordName?: string;
  }): Promise<ICustomer[]> {
    const url = '/api/services/app/ProviderBusinessChat/GetUserFriendshipChats';
    console.log(params);

    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params: params,
    });

    return response.result.data;
  }
}

export default new ChatApi();
