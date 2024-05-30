export enum EHomeRole {
  Owner = 'OWNER',
  Manager = 'MANAGER',
  Member = 'MEMBER',
}

export type TMemberRole = 'OWNER' | 'MANAGER' | 'MEMBER';

export type TEstateType =
  | 'DEFAULT'
  | 'APARTMENT'
  | 'HOUSE'
  | 'COMMERCIAL'
  | 'SCHOOL';

export type TMemberStatus = 'ACTIVE' | 'PENDING' | 'BLOCKED';
export interface IGetAllHomeResponse {
  tenantId?: number;
  id: number;
  name: string;
  description?: string;
  imageFileUrls: string[];
  imageFileIds: string[];
  userId: number;
  type: TEstateType;
  createdAt: Date;
  members: any[];
  status: TMemberStatus;
  role: TMemberRole;
}

export interface ICreateHome {
  tenantId?: number;
  name: string;
  description?: string;
  imageFileUrls?: any[];
  imageFileIds?: any[];
  type: string;
  areas?: {
    name: string;
    description?: string;
    imageUrls?: string[];
  }[];
}

export interface IUpdateHome {
  type?: string;
  name?: string;
  description?: string;
  imageFileUrls?: any[];
  imageFileIds?: any[];
}

export interface IAddMemberToHome {
  account?: string;
  role: EHomeRole;
  nickname?: string;
}

export interface IGetOneHomeResponse {
  createdAt: Date;
  tenantId?: number;
  id: number;
  name: string;
  description?: string;
  imageFileUrls: any[];
  imageFileIds: any[];
  areas?: any[];
  type: TEstateType;
  members: {
    nickname?: string;
    account: string;
    userId: number;
    role: TMemberRole;
    status: TMemberStatus;
  }[];
}

export const HOME_TYPES = [
  { label: 'home.types.default', value: 'DEFAULT' },
  { label: 'home.types.apartment', value: 'APARTMENT' },
  { label: 'home.types.house', value: 'HOUSE' },
  { label: 'home.types.commercial', value: 'COMMERCIAL' },
  { label: 'home.types.school', value: 'SCHOOL' },
];

export const MEMBER_ROLES = [
  { label: 'home.role.owner', value: 'OWNER' },
  { label: 'home.role.manager', value: 'MANAGER' },
  { label: 'home.role.member', value: 'MEMBER' },
];

export interface IAddRoomToHome {
  name: string;
  description?: string;
  imageUrls?: string[];
}

export interface IUpdateRoom {
  name?: string;
  description?: string;
  imageFileUrls?: string[];
  imageFileIds?: string[];
}

export interface IGetRoomFromHome {
  id: number;
  name: string;
  description?: string;
  imageUrls: string[];
  estateId: number;
  createdAt: Date;
  updatedAt: Date;
  estate: {
    id: number;
    name: string;
    type: TEstateType;
    imageUrls?: string[];
  };
}
