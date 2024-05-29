/**
 * Moment Models
 *
 */
export interface IMomentSceneGetAll {
  id: number;
  name: string;
  imageFileUrl: string;
  imageFileId: string;
  estateId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMomentAction {
  id: string;
  index: number;
  deviceId: string;
  attribute: string;
  ep: string;
  value: string;
  delay: number;
  doAutomationSceneId: number;
  doAutomationSceneEnabled: boolean;
  doMomentSceneId: number;
}

export interface ICreateMomentAction {
  index: number;
  deviceId?: string;
  attribute?: string;
  ep?: string;
  value?: string;
  delay?: number;
  doAutomationSceneId?: number;
  doAutomationSceneEnabled?: boolean;
  doMomentSceneId?: number;
}

export interface IUpdateMomentAction extends ICreateMomentAction {
  id: string;
}

export interface IMomentSceneGetById {
  id: number;
  name: string;
  imageFileUrl: string;
  imageFileId: string;
  estateId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  actions: IMomentAction[];
}

export interface ICreateMomentScene {
  name: string;
  imageFileId?: string;
  imageFileUrl?: string;
  actions: ICreateMomentAction[];
}

export interface IUpdateMomentScene {
  name: string;
  imageFileId?: string;
  imageFileUrl?: string;
  actions: IUpdateMomentAction[];
}

/**
 * Automation Models
 *
 * */

export enum EAutomationSceneConditionsType {
  ALL = 'ALL',
  ANY = 'ANY',
}

export interface IAutomationSceneGetAll {
  conditionsType: EAutomationSceneConditionsType;
  id: number;
  name: string;
  imageFileUrl: string;
  imageFileId: string;
  estateId: number;
  userId: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum ESceneConditionCompare {
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
}

export interface ICreateSceneCondition {
  compare?: ESceneConditionCompare;
  deviceId?: string;
  attribute?: string;
  ep?: string;
  value?: string;
  schedule?: string;
}

export interface ISceneCondition extends ICreateSceneCondition {
  id: string;
  automationSceneId?: number;
}

export interface ISceneAction {
  id: string;
  index: number;
  deviceId: string;
  attribute: string;
  ep: string;
  value: string;
  delay: number;
  doAutomationSceneId: number;
  doAutomationSceneEnabled: boolean;
  doMomentSceneId: number;
  momentSceneId: number;
}

export interface IAutomationSceneGetById {
  conditionsType: EAutomationSceneConditionsType;
  conditions: ISceneCondition[];
  actions: ISceneAction[];
  id: number;
  name: string;
  imageFileUrl: string;
  imageFileId: string;
  estateId: number;
  userId: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateAutomationScene {
  conditionsType: EAutomationSceneConditionsType;
  name: string;
  imageFileId?: any;
  imageFileUrl?: any;
  conditions: ICreateSceneCondition[];
  actions: ICreateMomentAction[];
}

export interface IUpdateAutomationScene extends ICreateAutomationScene {
  conditionsType: EAutomationSceneConditionsType;
  name: string;
  imageFileId?: any;
  imageFileUrl?: any;
  conditions: ISceneCondition[];
  actions: ISceneAction[];
}
