import { IHttpResponse, TBaseGetParams } from '@src/common/common.model';
import httpUtil from '@src/utils/http.util';

import {
  IDevice,
  IDeviceCategory,
  IDeviceDetail,
  TDeviceProfile,
} from './device.model';

class DeviceService {
  async getAllDeviceCategories() {
    const response = await httpUtil.request<IHttpResponse<IDeviceCategory[]>>({
      url: '/api/devices/categories',
      method: 'GET',
    });

    return response.data;
  }

  async getAllDevices(
    params: { estateId: number; areaId?: number } & TBaseGetParams,
  ) {
    const response = await httpUtil.request<IHttpResponse<IDevice[]>>({
      url: '/api/devices',
      method: 'GET',
      params,
    });

    return response.data;
  }

  async getProfiles() {
    const response = await httpUtil.request<IHttpResponse<TDeviceProfile>>({
      url: '/api/devices/profiles',
      method: 'GET',
    });

    return response.data;
  }

  async delete(id: string) {
    const response = await httpUtil.request<IHttpResponse<boolean>>({
      url: `/api/devices/${id}`,
      method: 'DELETE',
    });

    return response.data;
  }

  async get(id: string) {
    const response = await httpUtil.request<IHttpResponse<IDeviceDetail>>({
      url: `/api/devices/${id}`,
      method: 'GET',
    });

    return response.data;
  }

  async update(
    id: string,
    data: {
      areaId?: number;
      name?: string;
      description?: string;
    },
  ) {
    const response = await httpUtil.request<IHttpResponse<boolean>>({
      url: `/api/devices/${id}`,
      method: 'PATCH',
      data,
    });

    return response.data;
  }
}

export default new DeviceService();
