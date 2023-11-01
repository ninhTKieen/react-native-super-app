export interface IRateItem {
  id: number;
  tenantId: number;
  itemId: number;
  providerId: number;
  ratePoint: number;
  fileUrl?: string;
  comment: string;
  answerRateId: number;
  type: number;
  userName: string;
  creationTime: string;
  email: string;
  creatorUserId: number;
  avatar: string;
  orderId: number;
  bookingId: number;
}
export interface IPageRate {
  pageData: IRateItem[];
  totalRecord: number;
}
