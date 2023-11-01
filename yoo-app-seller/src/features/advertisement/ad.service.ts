import {HOST_SERVER} from '@env';

import {axiosRequest, axiosMethod} from '@/utils/api.util';
import {AdGetAllParams, CreateAdData} from './ad.model';

class AdServices {
  apiEndPoint: string;
  constructor() {
    this.apiEndPoint = HOST_SERVER;
  }

  async getAdList(params: AdGetAllParams) {
    const url = '/api/services/app/Advertisement/GetAllAdvertisementsByPartner';
    const response = await axiosRequest({
      url,
      method: axiosMethod.GET,
      params,
    });

    return response.result;
  }

  async createAd(data: CreateAdData) {
    const url = '/api/services/app/Advertisement/CreateAdvertisement';
    const response = await axiosRequest({
      url,
      method: axiosMethod.POST,
      data,
    });

    return response.result;
  }

  async deleteAd(adId: number) {
    const url = '/api/services/app/Advertisement/DeleteAdvertisement';
    const response = await axiosRequest({
      url,
      method: axiosMethod.DELETE,
      params: {
        id: adId,
      },
    });

    return response.result;
  }
}

export default new AdServices();
