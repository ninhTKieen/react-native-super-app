import {ICustomer} from '@/features/chat/chat.model';

export type ChatStackParamList = {
  ListCustomerChatScreen: {
    idStore?: number;
  };
  SearchCustomerChatScreen: undefined;
  ChatboxScreen: {
    customer?: ICustomer;
  };
};
