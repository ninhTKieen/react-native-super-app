export interface IStore {
  id: number;
  name: string;
  email: string;
  contact: string;
  description: string;
  phoneNumber: string;
  imageUrls: string[];
  ownerInfo?: string;
  businessInfo?: string;
  tenantId?: number;
  socialTenantId?: number;
  type?: number;
  groupType?: number;
  latitude?: number;
  longitude?: number;
  propertyHistories?: string;
  properties?: string;
  state?: number;
  stateProperties?: string;
  countRate?: number;
  ratePoint?: number;
  isDataStatic?: boolean;
  isAdminCreate?: boolean;
  districtId?: string;
  provinceId?: string;
  wardId?: string;
  address?: string;
  workTime?: string;
  isTenantPartner?: boolean;
  creationTime?: Date;
  distance?: number;
  ownerId?: number;
}

export interface IStoreCreate {
  name: string;
  email: string;
  contact: string;
  description: string;
  phoneNumber: string;
  businessInfo?: string;
  type: number;
  provinceId: string;
  districtId: string;
  wardId: string;
  imageUrls: string[];
  latitude?: number;
  longitude?: number;
  properties?: string;
  address?: string;
  workTime?: string;
  groupType: number;
  ownerId?: number;
  ownerInfo?: string;
  tenantId?: number;
  socialTenantId?: number;
  propertyHistories?: string;
  stateProperties?: string;
}

export interface IStoreStatus {
  currentStore?: number;
  currentStoreInfor?: IStore;
}

export interface IStoreUpdate {
  name?: string;
  email?: string;
  contact?: string;
  description?: string;
  phoneNumber?: string;
  businessInfo?: string;
  type: number;
  provinceId?: string;
  districtId?: string;
  wardId?: string;
  imageUrls?: string[];
  latitude?: number;
  longitude?: number;
  properties?: string;
  address?: string;
  workTime?: string;
  groupType: number;
  ownerId?: number;
  ownerInfo?: string;
  tenantId?: number;
  socialTenantId?: number;
  propertyHistories?: string;
  stateProperties?: string;
}

export enum FormIdUpdateState {
  BLOCK = 1,
  ACTIVATE = 2,
}

export enum StoreState {
  // PENDING = 1,
  ACTIVE = 2,
  SUSPENDED = 3,
  // HIDDEN = 4,
  // SUSPENDED = 5, // ENTERPRISE SUSPENSION, not block
}
