export interface IFullAuditedEntity<T> {
  creationTime: string;
  creatorId?: T;
  lastModificationTime?: string;
  lastModifierId?: number;
  isDeleted: boolean;
  deleterId?: number;
  deletionTime?: string;
}

export interface IMayHaveTenant {
  tenantId?: number;
}
export interface IImage {
  uri: string;
  width: number;
  height: number;
  type: string;
  size: number;
  name: string;
}
