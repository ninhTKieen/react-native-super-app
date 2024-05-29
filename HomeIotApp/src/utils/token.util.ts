import { storage } from '@src/common/mmkv.storage';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TENANT_ID_KEY,
} from '@src/configs/constant/constant.config';

export const getAccessToken = () => storage.getString(ACCESS_TOKEN_KEY);

export const setAccessToken = (token: string) =>
  storage.set(ACCESS_TOKEN_KEY, token);

export const removeAccessToken = () => storage.delete(ACCESS_TOKEN_KEY);

export const getRefreshToken = () => storage.getString(REFRESH_TOKEN_KEY);

export const setRefreshToken = (token: string) =>
  storage.set(REFRESH_TOKEN_KEY, token);

export const removeRefreshToken = () => storage.delete(REFRESH_TOKEN_KEY);

export const getTenantId = () => storage.getString(TENANT_ID_KEY);

export const setTenantId = (tenantId: string) =>
  storage.set(TENANT_ID_KEY, tenantId);

export const removeTenantId = () => storage.delete(TENANT_ID_KEY);
