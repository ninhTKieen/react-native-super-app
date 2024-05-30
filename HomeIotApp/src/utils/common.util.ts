import messaging from '@react-native-firebase/messaging';
import i18n, { i18nKeys } from '@src/configs/i18n';
import { Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';

export const isAndroid = Platform.OS === 'android';

export const isIOS = Platform.OS === 'ios';

export const isMacAddressValid = (macAddress: string): boolean => {
  const macAddressRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macAddressRegex.test(macAddress);
};

// convert string to mac address

export const stringToMacAddress = (str: string): string => {
  const macAddressRegex = /([0-9A-Fa-f]{2})/g;
  return str.match(macAddressRegex)?.join(':') || '';
};

export const getObjectKeyName = (object: any): string => {
  return object && Object.keys(object)[0];
};

export const cronStringToTimeAndDays = (cron: string) => {
  const cronParts = cron?.split(' ');
  const hour = cronParts?.[1];
  const minute = cronParts?.[0];

  const dayText = cronParts?.[4];

  const res = {
    hour: Number(hour) < 10 ? `0${hour}` : hour,
    minute: Number(minute) < 10 ? `0${minute}` : minute,
    daysText: '',
    days: [] as number[],
  };

  if (dayText === '*') {
    res.daysText = i18n.t(i18nKeys.dayOfWeek.everyDay);
    res.days = [0, 1, 2, 3, 4, 5, 6];
  } else {
    const daysArray = dayText?.split(',');
    if (daysArray?.length === 7) {
      res.daysText = i18n.t(i18nKeys.dayOfWeek.everyDay);
    } else {
      res.daysText = daysArray
        ?.map((day) => i18n.t((i18nKeys.dayOfWeek.short as any)[day]))
        ?.join(', ');
    }
    res.days = daysArray?.map((day) => Number(day));
  }

  return res;
};

export const requestPermission = async (): Promise<boolean> => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }

  try {
    if (isAndroid) {
      const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      console.log('POST_NOTIFICATIONS status:', result);
    }
  } catch (error) {
    console.log('POST_NOTIFICATIONS error ', error);
  }

  return enabled;
};
