import {IItem, ItemAttribute} from '@/features/item/item.model';

export const itemRoutes = {
  root: 'ItemStack',

  list: 'ItemList',
  create: 'CreateItem',
  detail: 'ItemDetail',
  attribute: 'ItemAttribute',
  category: 'ItemCategory',
  attribute_detail: 'ItemAttributeDetail',
  create_variant: 'CreateItemVariant',
  variant_info: 'ItemVariantInfo',
  edit: 'EditItem',
};
export type ItemStackParamList = {
  ItemList: {};
  CreateItem: {
    idStore?: number;
  };
  EditItemStack: {
    item: IItem;
  };
  ItemDetail: {
    item: IItem;
  };
  ItemAttribute: {};
  ItemCategory: {};
  ItemAttributeDetail: {
    attribute: ItemAttribute;
  };
  CreateItemVariant: {};
  ItemVariantInfo: {};
};

export type ItemTabParamList = {
  InStockTab: {status: number};
  OutOfStockTab: {status: number};
  ReviewingTab: {status: number};
  ViolationTab: {status: number};
  HiddenTab: {status: number};
  PendingApproveTab: {status: number};
  SuspendedTab: {status: number};
};

export type EditItemStackParamList = {
  EditItem: {
    item: IItem;
  };
  EditVariantInfo: undefined;
};
