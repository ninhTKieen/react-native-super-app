import httpUtil, {axiosMethod} from '@/utils/http.util';
import {IPageRate} from './rate.model';
class RateApi {
  async getRate(params: {
    ProviderId: number;
    Rating?: number;
    Type: number;
    MaxResultCount?: number;
    SkipCount?: number;
  }): Promise<IPageRate | undefined> {
    try {
      const url = '/api/services/app/Rate/GetAllRates';

      const response = await httpUtil.request({
        method: axiosMethod.GET,
        url,
        params,
      });

      return {
        pageData: response.result.data,
        totalRecord: response.result.totalRecords,
      };
    } catch (error) {
      console.log('error', error);
    }
  }
  async getCountRate(params: {
    ProviderId: number;
    Rating?: number;
    Type: number;
    MaxResultCount?: number;
    SkipCount?: number;
  }): Promise<any> {
    try {
      const url = '/api/services/app/Rate/GetCountRate';

      const response = await httpUtil.request({
        method: axiosMethod.GET,
        url,
        params,
      });

      return response.result.data;
    } catch (error) {
      console.log('error', error);
    }
  }
}

export default new RateApi();
