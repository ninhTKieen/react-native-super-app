import {IFullAuditedEntity, IMayHaveTenant} from '../common/common.model';
import {ItemStatus} from '@/features/item/item.model';

export interface IItemBookingModel {
  originalPrice: number;
  currentPrice: number;
  imageUrl: string;
}
export interface IItemBooking
  extends IFullAuditedEntity<number>,
    IMayHaveTenant {
  id: number;
  name: string;
  providerId: number;
  imageUrlList:
    | Array<string>
    | Array<{
        uri: string;
        width: number;
        height: number;
        type: string;
        size: number;
        name: string;
      }>;
  videoUrlList: Array<string>;
  description: string;
  sizeInfo: string;
  type: number;
  properties: string;
  modelList: Array<IItemBookingModel>;
  status: ItemStatus;
}

export interface IListItemBooking {
  totalRecords: number;
  items: Array<IItemBooking>;
}
export interface ICreateItemBooking {
  tenantId: number;
  name: string;
  providerId: number;
  imageUrlList:
    | Array<string>
    | Array<{
        uri: string;
        width: number;
        height: number;
        type: string;
        size: number;
        name: string;
      }>;
  videoUrlList: Array<string>;
  description: string;
  sizeInfo: string;
  type: number;
  properties: string;
  itemModel: {
    originalPrice: number;
    currentPrice: number;
    imageUrl: string;
  };
}
export interface IItemBookingMedicalAttr {
  personalInfor: {
    name: string;
    phoneNumber: string;
    dateOfBirth: Date;
    address: string;
    email: string;
  };
  literacy: Array<{
    dateFrom: Date;
    dateTo: Date;
    university: string;
    major: string;
  }>;
  experience: Array<{
    dateFrom: Date;
    dateTo: Date;
    position: string;
    company: string;
  }>;
  certificate: Array<{
    dateFrom: Date;
    dateTo: Date;
    name: string;
    description: string;
  }>;
}

export interface SportProperties {
  name: string;
  type: string;
  phoneNumber: string;
  address: string;
  priceHour: number;
  timeFrames: Array<{
    from: number;
    to: number;
    price: number;
  }>;
}
