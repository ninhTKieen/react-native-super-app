import httpUtil, {axiosMethod} from '@/utils/http.util';
import {IListOrder, IOrder, OrderSortState} from './order.model';

class OrderApi {
  async getAllOrder(params: {
    providerId?: number;
    formId: number;
    skipCount?: number;
  }): Promise<IListOrder> {
    const url = '/api/services/app/Order/GetAllOrdersByPartner';

    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params: {
        ...params,
        orderBy: OrderSortState.NEWEST,
      },
    });

    return {
      totalRecords: response.result.totalRecords,
      orders: response.result.data,
    };
  }

  async getOrderById(id: number): Promise<IOrder> {
    const url = '/api/services/app/Order/GetOrderById';
    const params = {
      id,
    };
    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params,
    });

    return response.result;
  }

  async acceptOrder({id, type}: {id: number; type: number}): Promise<boolean> {
    const url = '/api/services/app/Order/PartnerConfirmOrder';
    const data = {
      id,
      type,
    };

    const response = await httpUtil.request({
      url,
      method: axiosMethod.POST,
      data,
    });

    return response.result.success;
  }

  async cancelOrder({
    id,
    reason,
  }: {
    id: number;
    reason: string;
  }): Promise<boolean> {
    const url = '/api/services/app/Order/PartnerCancelOrder';
    const data = {
      id,
      reason,
    };

    const response = await httpUtil.request({
      url,
      method: axiosMethod.POST,
      data,
    });

    return response.result.success;
  }

  async refuseOrder({id, type}: {id: number; type: number}): Promise<boolean> {
    const url = '/api/services/app/Order/PartnerRefuseOrder';
    const data = {
      id,
      type,
    };

    const response = await httpUtil.request({
      url,
      method: axiosMethod.POST,
      data,
    });

    return response.result.success;
  }
}

export default new OrderApi();
