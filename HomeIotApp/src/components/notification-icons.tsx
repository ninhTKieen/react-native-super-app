import AddUserIcon from '@src/assets/notification/add-user.svg';
import ManagerIcon from '@src/assets/notification/manager.svg';
import RemoveUserIcon from '@src/assets/notification/remove-user.svg';
import UserIcon from '@src/assets/notification/user.svg';
import AlarmIcon from '@src/assets/smart-home/device/alarm-fire/ic_baochay.svg';
import DeviceIcon from '@src/assets/smart-home/device/blue/ic_dieuhoaamtran_blue.svg';
import { ENotificationType } from '@src/features/notifications/notification.model';

export const NotificationIcons = {
  [ENotificationType.ALARM]: AlarmIcon,
  [ENotificationType.MESSAGE_DEVICE_ADD]: DeviceIcon,
  [ENotificationType.MESSAGE_DEVICE_UPDATE]: DeviceIcon,
  [ENotificationType.MESSAGE_DEVICE_REMOVE]: DeviceIcon,
  [ENotificationType.MESSAGE_ESTATE_MEMBER_ADD]: AddUserIcon,
  [ENotificationType.MESSAGE_ESTATE_MEMBER_REMOVE]: RemoveUserIcon,
  [ENotificationType.MESSAGE_ESTATE_MEMBER_INVITE]: AddUserIcon,
  [ENotificationType.MESSAGE_ESTATE_MEMBER_UPDATE_ROLE_MANAGER]: ManagerIcon,
  [ENotificationType.MESSAGE_ESTATE_MEMBER_UPDATE_ROLE_MEMBER]: UserIcon,
};
