import {ImageProps} from '@/components/modals/choose-image-modal';

export enum FORM_ID {
  ALL = 20,
  PENDING = 21,
  ACTIVATED = 22,
}

export interface AdGetAllParams {
  providerId: number;
  itemId: number;
  formId: FORM_ID;
  dateFrom?: string;
  dateTo?: string;
  categoryId: number;
  typeBusiness: number;
  maxResultCount?: number;
  skipCount?: number;
}

export interface ICreateAdData {
  tenantId: number;
  link: string;
  imageUrl: string | ImageProps;
  descriptions: string;
  providerId: number;
  itemId: number;
  categoryId: number;
  typeBusiness: number;
}
