export interface IPromotionItem {
  type: 'incoming' | 'ongoing' | 'expired';
}

export interface IVoucher {
  id: number;
  tenantId: string;
  providerId: string;
  type: number;
  scope: number;
  descriptions?: string;
  discountType: number;
  voucherCode: string;
  name: string;
  quantity: number;
  currentUsage: number;
  minBasketPrice: number;
  maxPrice: number;
  percentage: number;
  discountAmount: number;
  creationTime: string;
  dateStart: string;
  dateEnd: string;
  state: number;
  isAdminCreated: boolean;
  maxDistributionBuyer: number;
  listUser: any;
  creatorUserId: number;
  listItems: number[];
}

export interface IVoucherCreate {
  tenantId?: number;
  providerId?: number;
  type: number;
  scope: number;
  descriptions?: string;
  discountType: number;
  voucherCode: string;
  name: string;
  quantity: number;
  minBasketPrice: number;
  maxPrice: number;
  percentage?: number;
  discountAmount: number;
  dateStart: string;
  dateEnd: string;
  isAdminCreated?: boolean;
  maxDistributionBuyer: number;
  listItems: number[];
}

export interface IVoucherUpdate {
  id: number;
  type: number;
  scope: number;
  descriptions?: string;
  name: string;
  quantity: number;
  minBasketPrice: number;
  maxPrice: number;
  percentage?: number;
  discountAmount: number;
  dateStart: string;
  dateEnd: string;
  maxDistributionBuyer: number;
  listItems: number[];
}
