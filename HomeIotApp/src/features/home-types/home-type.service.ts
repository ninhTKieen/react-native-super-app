import { IHttpResponseList } from '@src/common/common.model';
import httpUtil from '@src/utils/http.util';

import { IGetAllHomeTypeResponse } from './home-type.model';

class HomeTypeService {
  async getAllHomes() {
    const response = await httpUtil.request<
      IHttpResponseList<IGetAllHomeTypeResponse>
    >({
      url: '/api/estate-types/get-all',
      method: 'GET',
      params: {
        limit: 1000,
        page: 1,
      },
    });

    return response.data;
  }
}

export default new HomeTypeService();
