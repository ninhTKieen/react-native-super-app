import i18n from '@src/configs/i18n';
import _dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';

_dayjs.locale('vi');
_dayjs.extend(relativeTime);

export const dayjs = _dayjs;

export const formatDate = (date: string, format = 'DD/MM/YYYY') => {
  if (!date) {
    return '';
  }

  return dayjs(date).locale(i18n.language).format(format);
};

export const formatDateFromNow = (date: string) => {
  if (!date) {
    return '';
  }

  return dayjs(date).locale(i18n.language).fromNow();
};

export const formatTime = (time: { hours: number; minutes: number }) => {
  if (!time) {
    return '';
  }

  const { hours, minutes } = time;
  const formattedTime = dayjs()
    .hour(hours)
    .minute(minutes)
    .locale(i18n.language);

  if (i18n.language === 'vi') {
    // Vietnamese formatting
    return formattedTime.format('HH:mm');
  } else {
    // English formatting
    return formattedTime.format('h:mm A');
  }
};

export const getCurrentDate = () => {
  return dayjs().locale(i18n.language).format('dddd, DD/MMM/YYYY');
};
