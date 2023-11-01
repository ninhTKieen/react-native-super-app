import axios from 'axios';
import {IStore, IStoreCreate, IStoreUpdate} from './store.model';
import httpUtil, {axiosMethod} from '@/utils/http.util';
import {HOST_SERVER_GET_REGION} from '@env';

type RESPONSE = {
  value: string;
  label: string;
};
class StoreApi {
  HOST_SERVER_GET_REGION: string;
  constructor() {
    this.HOST_SERVER_GET_REGION = HOST_SERVER_GET_REGION;
  }

  async getProvinces(): Promise<RESPONSE[]> {
    const url = '/api/services/app/VietnameseAdministrative/GetAllProvinces';

    return (
      await axios({
        url: this.HOST_SERVER_GET_REGION + url,
        method: 'GET',
      })
    ).data.result.map((item: any) => {
      return {
        value: item.code,
        label: item.fullName,
      };
    });
  }

  async getDistricts(provinceCode: string) {
    const url = '/api/services/app/VietnameseAdministrative/GetAllDistricts';
    return (
      await axios({
        url: this.HOST_SERVER_GET_REGION + url,
        method: 'GET',
        params: {
          provinceCode,
        },
      })
    ).data.result.map((item: any) => {
      return {
        value: item.code,
        label: item.fullName,
      };
    });
  }

  async getWards(districtCode: string) {
    const url = '/api/services/app/VietnameseAdministrative/GetAllWards';
    return (
      await axios({
        url: this.HOST_SERVER_GET_REGION + url,
        method: 'GET',
        params: {
          districtCode,
        },
      })
    ).data.result.map((item: any) => {
      return {
        value: item.code,
        label: item.fullName,
      };
    });
  }

  async createProvider(data: IStoreCreate) {
    data.workTime = '';
    data.ownerInfo = '';
    data.propertyHistories = '';
    data.properties = '';
    data.stateProperties = '';
    data.businessInfo = data.businessInfo || '';
    const url = '/api/services/app/Provider/CreateProvider';
    return httpUtil.request({
      url,
      method: axiosMethod.POST,
      data,
    });
  }

  async getAllProviders(params?: any): Promise<IStore[]> {
    const url = '/api/services/app/Provider/GetAllProvidersByPartner';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params: {
        ...params,
        maxResultCount: 200,
      },
    });

    return response.result.data;
  }

  async getProviderById(params: {id: number}): Promise<IStore> {
    const url = '/api/services/app/Provider/GetProviderById';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params: params,
    });
    return response.result.data;
  }

  async updateProvider(data: IStoreUpdate) {
    const url = '/api/services/app/Provider/UpdateProvider';
    return httpUtil.request({
      url,
      method: axiosMethod.PUT,
      data,
    });
  }

  async deleteProvider(params: {id: number}) {
    const url = '/api/services/app/Provider/DeleteProvider';

    return httpUtil.request({
      url,
      method: axiosMethod.DELETE,
      params,
    });
  }

  async getRevenue(params: {
    providerId: number;
    year?: number;
    type: number;
    month?: number;
  }) {
    const url = '/api/services/app/Order/GetRevenue';

    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params,
    });
    return response.result.data;
  }

  async getCountOrders(params: {providerId: number}) {
    const url = '/api/services/app/Order/GetCountOrders';

    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params,
    });
    return response.result.data;
  }

  async updateStateOfProvider(data: {
    id: number;
    formId: number;
  }): Promise<boolean> {
    const url = '/api/services/app/Provider/UpdateStateOfProvider';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.PUT,
      data,
    });
    return response.result.success;
  }
}

export default new StoreApi();
