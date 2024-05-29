import { NotificationIcons } from '@src/components/notification-icons';
import { i18nKeys } from '@src/configs/i18n';
import { ENotificationType } from '@src/features/notifications/notification.model';
import { useTranslation } from 'react-i18next';

export const useNotifContent = () => {
  const { t } = useTranslation();

  const NotifContents = {
    [ENotificationType.MESSAGE_ESTATE_MEMBER_ADD]: {
      title: t(i18nKeys.notification.content.addMemberTitle),
      message: (params?: any) =>
        t(i18nKeys.notification.content.addMember, params),
      icon: NotificationIcons[ENotificationType.MESSAGE_ESTATE_MEMBER_ADD],
    },
    [ENotificationType.MESSAGE_ESTATE_MEMBER_INVITE]: {
      title: t(i18nKeys.notification.content.inviteMemberTitle),
      message: (params?: any) =>
        t(i18nKeys.notification.content.inviteMember, params),
      icon: NotificationIcons[ENotificationType.MESSAGE_ESTATE_MEMBER_INVITE],
    },
    [ENotificationType.MESSAGE_ESTATE_MEMBER_REMOVE]: {
      title: t(i18nKeys.notification.content.removeMemberTitle),
      message: (params?: any) =>
        t(i18nKeys.notification.content.removeMember, params),
      icon: NotificationIcons[ENotificationType.MESSAGE_ESTATE_MEMBER_REMOVE],
    },
    [ENotificationType.MESSAGE_ESTATE_MEMBER_UPDATE_ROLE_MANAGER]: {
      title: t(i18nKeys.notification.content.memberUpdateRoleTitle),
      message: (params?: any) =>
        t(i18nKeys.notification.content.updateToManager, params),
      icon: NotificationIcons[
        ENotificationType.MESSAGE_ESTATE_MEMBER_UPDATE_ROLE_MANAGER
      ],
    },
    [ENotificationType.MESSAGE_ESTATE_MEMBER_UPDATE_ROLE_MEMBER]: {
      title: t(i18nKeys.notification.content.memberUpdateRoleTitle),
      message: (params?: any) =>
        t(i18nKeys.notification.content.updateToMember, params),
      icon: NotificationIcons[
        ENotificationType.MESSAGE_ESTATE_MEMBER_UPDATE_ROLE_MEMBER
      ],
    },
    [ENotificationType.MESSAGE_DEVICE_ADD]: {
      title: t(i18nKeys.notification.content.addDeviceTitle),
      message: (params?: any) =>
        t(i18nKeys.notification.content.addDevice, params),
      icon: NotificationIcons[ENotificationType.MESSAGE_DEVICE_ADD],
    },
    [ENotificationType.MESSAGE_DEVICE_UPDATE]: {
      title: t(i18nKeys.notification.content.deviceUpdateTitle),
      message: (params?: any) =>
        t(i18nKeys.notification.content.deviceUpdate, params),
      icon: NotificationIcons[ENotificationType.MESSAGE_DEVICE_UPDATE],
    },
    [ENotificationType.MESSAGE_DEVICE_REMOVE]: {
      title: t(i18nKeys.notification.content.deviceRemoveTitle),
      message: (params?: any) =>
        t(i18nKeys.notification.content.deviceRemove, params),
      icon: NotificationIcons[ENotificationType.MESSAGE_DEVICE_REMOVE],
    },
  };

  return { NotifContents };
};
