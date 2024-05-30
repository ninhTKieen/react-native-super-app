import { EResponseCode } from '@src/configs/enums/response-code.enum';

export interface IHttpResponse<T> {
  code: EResponseCode;
  data: T;
  message: string;
}

export interface IHttpResponseList<T> {
  code: EResponseCode;
  data: {
    items: T[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };
  message: string;
}

export interface INewHttpResponseList<T> {
  code: EResponseCode;
  message: string;
  params?: any;
  data: T[];
}

export type TLocalImgProps = {
  uri: string;
  width: number;
  height: number;
  type: string;
  size: number;
  name: string;
};

export type TBaseGetParams = {
  skip?: number;
  take?: number;
  search?: string;
  sort?: string;
  order?: string;
};

export enum EWeekDay {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}
