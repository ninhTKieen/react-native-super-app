import { EDeviceType } from '../devices/device.model';

export enum ENotificationType {
  // message
  MESSAGE_ESTATE_MEMBER_ADD = 'MESSAGE_ESTATE_MEMBER_ADD',
  MESSAGE_ESTATE_MEMBER_INVITE = 'MESSAGE_ESTATE_MEMBER_INVITE',
  MESSAGE_ESTATE_MEMBER_REMOVE = 'MESSAGE_ESTATE_MEMBER_REMOVE',
  MESSAGE_ESTATE_MEMBER_UPDATE_ROLE_MANAGER = 'MESSAGE_ESTATE_MEMBER_UPDATE_ROLE_MANAGER',
  MESSAGE_ESTATE_MEMBER_UPDATE_ROLE_MEMBER = 'MESSAGE_ESTATE_MEMBER_UPDATE_ROLE_MEMBER',
  MESSAGE_DEVICE_ADD = 'MESSAGE_DEVICE_ADD',
  MESSAGE_DEVICE_UPDATE = 'MESSAGE_DEVICE_UPDATE',
  MESSAGE_DEVICE_REMOVE = 'MESSAGE_DEVICE_REMOVE',

  // alarm
  ALARM = 'ALARM',
}

export enum ENotificationStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
}

export interface INotification {
  id: number;
  data: {
    type: ENotificationType;
    userId: number;
    estateId: number;
    deviceName: EDeviceType | string;
    estateName: string;
    memberName?: string;
  };
  type: ENotificationType;
  userId: number;
  status: ENotificationStatus;
  createdAt: string;
  updatedAt: string;
}

export enum ENotificationGroupType {
  MESSAGE = 'MESSAGE',
  ALARM = 'ALARM',
  BULLETIN = 'BULLETIN',
}
