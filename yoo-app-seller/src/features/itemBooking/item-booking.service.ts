import {ICreateItemBooking, IListItemBooking} from './item-booking.model';
import httpUtil, {axiosMethod} from '@/utils/http.util';

class ItemBookingServices {
  async getAll(params: {
    providerId: number;
    skipCount?: number;
    formId?: number;
    isItemBooking: boolean;
  }): Promise<IListItemBooking> {
    const url = '/api/services/app/Item/GetAllItemsByPartner';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params,
    });

    return {
      totalRecords: response.result.totalRecords,
      items: response.result.data,
    };
  }

  async createItemBooking({item}: {item: ICreateItemBooking}): Promise<any> {
    const url = '/api/services/app/Item/CreateItemBooking';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.POST,
      data: item,
    });
    return response.result;
  }
}

export default new ItemBookingServices();
