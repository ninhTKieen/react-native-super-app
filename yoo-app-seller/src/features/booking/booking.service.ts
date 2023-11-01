import httpUtil, {axiosMethod} from '@/utils/http.util';
import {IBooking, IPageBooking} from './booking.model';

class BookingApi {
  async getAllBooking(params: {
    providerId?: number;
    formId?: number;
    skipCount?: number;
  }): Promise<IPageBooking> {
    const url = '/api/services/app/Booking/GetAllBookingsByPartner';

    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params: params,
    });

    return {
      totalRecords: response.result.totalRecords,
      items: response.result.data,
    };
  }
  async getBookingById(params: {id?: number}): Promise<IBooking> {
    const url = '/api/services/app/Booking/GetBookingById';

    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params: params,
    });

    return response.result.data;
  }
  async acceptBooking({
    id,
    type,
  }: {
    id: number;
    type: number;
  }): Promise<boolean> {
    const url = '/api/services/app/Booking/PartnerConfirmBooking';
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
  async refuseBooking({
    id,
    type,
  }: {
    id: number;
    type: number;
  }): Promise<boolean> {
    const url = '/api/services/app/Booking/PartnerRefuseBooking';
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
  async cancelBooking({
    id,
    reason,
  }: {
    id: number;
    reason: string;
  }): Promise<boolean> {
    const url = '/api/services/app/Booking/PartnerCancelBooking';
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
}

export default new BookingApi();
