import httpUtil, {axiosMethod} from '@/utils/http.util';
import {IVoucherCreate, IVoucherUpdate} from './voucher.model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN_KEY} from '@/configs/constant';
import axios from 'axios';

export type IGetVoucherQuery = {
  formId: number;
  providerId?: number;
  tenantId?: string;
  isAdminCreated?: boolean;
  search?: string;
  maxResultCount?: number;
  skipCount?: number;
};

export type IDeleteVoucher = {
  id: number;
};

class VoucherApi {
  async createVoucher(data: IVoucherCreate) {
    const url = '/api/services/app/Voucher/CreateVoucher';

    const response = await httpUtil.request({
      url,
      method: axiosMethod.POST,
      data,
    });

    return response.result.data;
  }

  async getAllVouchers(params: IGetVoucherQuery) {
    const url = '/api/services/app/Voucher/GetAllVouchersByPartner';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params: params,
    });

    return response.result.data;
  }

  async deleteVoucher(params: {id: number}) {
    const url = '/api/services/app/Voucher/DeleteVoucher';

    const response = await httpUtil.request({
      url,
      method: axiosMethod.DELETE,
      params,
    });

    return response.result.data;
  }

  async endVoucher(data: {id: number}) {
    const url = '/api/services/app/Voucher/EndedVoucher';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.POST,
      data,
    });

    return response.result.data;
  }

  async startVoucher(data: {id: number}) {
    const url = '/api/services/app/Voucher/StartEarlyVoucher';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.POST,
      data,
    });

    return response.result.data;
  }

  async updateVoucher(data: IVoucherUpdate) {
    const url = '/api/services/app/Voucher/UpdateVoucher';

    const response = await httpUtil.request({
      url,
      method: axiosMethod.PUT,
      data,
    });

    return response.result.data;
  }
}

export default new VoucherApi();
