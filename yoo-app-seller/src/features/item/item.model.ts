import {
  IFullAuditedEntity,
  IMayHaveTenant,
} from '@/features/common/common.model';

export enum ItemStatus {
  PENDING_APPROVE = 1,
  ACTIVE = 2,
  HIDDEN = 5,
  SUSPENDED = 6,
}

export enum ItemDisplay {
  ALL = 10,
  LIVE = 11,
  SOLD_OUT = 12,
  REVIEWING = 13,
  VIOLATION = 14,
  VIOLATION_BANNED = 141,
  VIOLATION_RESTRICTED = 142,
  VIOLATION_ADMIN_DELETED = 143,
  DELIST = 15,
  SUSPENDED = 16,
}

export enum ItemSorted {
  POPULAR = 1,
  LATEST = 2,
  TOP_SALES = 3,
  PRICE_ASC = 4,
  PRICE_DESC = 5,
  STOCK_ASC = 6,
  STOCK_DESC = 7,
  SALES_ASC = 8,
  SALES_DESC = 9,
}

export enum ItemCondition {
  NEW = 1,
  USED = 2,
}

export interface IItemModel extends IMayHaveTenant {
  id: number;
  name?: string;
  itemId?: number;
  isDefault?: boolean;
  sku?: string;
  stock: number;
  originalPrice: number;
  currentPrice: number;
  imageUrl: string;
  tierIndex: Array<number>;
  isDeleted: boolean;
  deletionTime?: Date;
  deleterUserId?: number;
}

export interface IItemTierVariation {
  name?: string;
  optionList?: Array<string>;
}

export interface IItem extends IFullAuditedEntity<number>, IMayHaveTenant {
  id: number;
  name?: string;
  providerId?: number;
  categoryId?: number;
  sku?: string;
  imageUrlList: Array<string>;
  videoUrlList?: Array<string>;
  description?: string;
  minPrice: number;
  maxPrice: number;
  sizeInfo?: string;
  logisticInfo?: string;
  status: ItemStatus;
  condition?: ItemCondition;
  complaintPolicy?: string;
  stock: number;
  attributeListProperties?: string;
  tierVariationListProperties?: string;
  attributeList?: Array<any>;
  tierVariationList?: Array<IItemTierVariation>;
  modelList?: Array<IItemModel>;
  ratePoint: number;
  sales: number;
  viewCount: number;
  type: number;
}

export interface ICreateItem {
  name: string;
  providerId: number;
  categoryId: number;
  sku: string;
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
  videoUrlList?: Array<string>;
  description: string;
  sizeInfo: string;
  logisticInfo: string;
  status: ItemStatus;
  condition: ItemCondition;
  complaintPolicy: string;
  attributeList: Array<{
    id: number | string;
    unitList: Array<string>;
    valueList: Array<string>;
  }>;
  tierVariationList: Array<IItemTierVariation>;
  modelList: Array<IItemModel>;
}

export interface IListItem {
  // totalCount: number;
  totalRecords: number;
  items: Array<IItem>;
}

export interface ItemCategory {
  id: number;
  name: string;
  parentId?: number;
  hasChildren: boolean;
  iconUrl?: string;
  businessType: number;
  children: Array<ItemCategory>;
}

export interface ItemCategoryNode {
  data: ItemCategory;
  children?: Array<ItemCategoryNode>;
}

export interface ItemAttribute {
  id: number;
  name: string;
  tenantId?: number;
  categoryId: number;
  displayName: string;
  description?: string;
  dataType: number;
  inputType: number;
  isRequired: boolean;
  unitList?: Array<string>;
  valueList?: Array<string>;
}

export enum ItemAttributeType {
  TextInput = 1,
  TextArea = 2,
  NumberInput = 3,
  DateTime = 4,
  Select = 5,
  MultiSelect = 6,
  Checkbox = 7,
  Radio = 8,
  Editor = 9,
}

export enum ItemAttributeDataType {
  String = 1,
  Int = 2,
  Float = 3,
  Date = 4,
  Boolean = 5,
  Array = 6,
}

export interface IDefaultModelList {
  originalPrice: number;
  currentPrice: number;
  stock: string;
  tierIndex: number[];
  sku: string;
  imageUrl: string;
}
