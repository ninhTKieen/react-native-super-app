export interface IMessage {
  creationTime?: Date;
  id: number;
  message: string;
  messageRepliedId?: number;
  providerId: number;
  readState: number;
  receiverReadState: number;
  sharedMessageId: string;
  side: number;
  targetTenantId: number;
  targetUserId: number;
  tenantId?: number;
  typeMessage: number;
  userId: number;
}
export interface IPageMessage {
  data: IMessage[];
  totalRecords: number;
}

export interface IChatState {
  hubSignalR?: any;
}

export interface ICustomer {
  creationTime: Date;
  friendImageUrl: string;
  friendName: string;
  friendTenantId: number;
  friendUserId: number;
  id: number;
  isOnline: boolean;
  lastMessage: IMessage;
  lastMessageDate: Date;
  providerId: number;
  tenantId?: number;
  unreadMessageCount: number;
  userId: number;
}
