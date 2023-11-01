import InforShopIcon from '@/assets/profile/InforStore.svg';
import LanguageIcon from '@/assets/profile/language.svg';
import SecurityIcon from '@/assets/profile/security.svg';
import SettingNotifiIcon from '@/assets/profile/settingnotifi.svg';
import DiscountIcon from '@/assets/profile/discount.svg';
import RateIcon from '@/assets/profile/rate.svg';
import SupportIcon from '@/assets/profile/support.svg';
import AboutIcon from '@/assets/profile/about.svg';
import ShareIcon from '@/assets/profile/share.svg';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';

export const ACTION_PROFILE_SCREEN = {
  INFOR_STORE: 1,
  LANGUAGE: 2,
  SECURITY: 3,
  SETTING_NOTIFI: 4,
  DISCOUNT: 5,
  RATE: 6,
  SUPPORT: 7,
  ABOUT: 8,
  SHARE: 9,
};
export const GetSectionData = () => {
  const {t} = useTranslation();
  const SectionData = [
    {
      title: t(i18nKeys.profile.myAccount.title) as string,
      data: [
        {
          name: t(i18nKeys.profile.myAccount.inforUser) as string,
          icon: InforShopIcon,
          event: ACTION_PROFILE_SCREEN.INFOR_STORE,
        },
        {
          name: t(i18nKeys.profile.myAccount.language) as string,
          icon: LanguageIcon,
          event: ACTION_PROFILE_SCREEN.LANGUAGE,
        },
      ],
    },
    {
      title: t(i18nKeys.profile.setting.title) as string,
      data: [
        {
          name: t(i18nKeys.profile.setting.security) as string,
          icon: SecurityIcon,
          event: ACTION_PROFILE_SCREEN.SECURITY,
        },
        {
          name: t(i18nKeys.profile.setting.settingNoti) as string,
          icon: SettingNotifiIcon,
          event: ACTION_PROFILE_SCREEN.SETTING_NOTIFI,
        },
      ],
    },
    {
      title: t(i18nKeys.profile.infor.title) as string,
      data: [
        {
          name: t(i18nKeys.profile.infor.discount) as string,
          icon: DiscountIcon,
          event: ACTION_PROFILE_SCREEN.DISCOUNT,
        },
        {
          name: t(i18nKeys.profile.infor.rate) as string,
          icon: RateIcon,
          event: ACTION_PROFILE_SCREEN.RATE,
        },
        {
          name: t(i18nKeys.profile.infor.support) as string,
          icon: SupportIcon,
          event: ACTION_PROFILE_SCREEN.SUPPORT,
        },
        {
          name: t(i18nKeys.profile.infor.about) as string,
          icon: AboutIcon,
          event: ACTION_PROFILE_SCREEN.ABOUT,
        },
        {
          name: t(i18nKeys.profile.infor.share) as string,
          icon: ShareIcon,
          event: ACTION_PROFILE_SCREEN.SHARE,
        },
      ],
    },
  ];
  return SectionData;
};

export const SectionData = [
  {
    title: 'Tài khoản của tôi',
    data: [
      {
        name: 'Thông tin người dùng',
        icon: InforShopIcon,
        event: ACTION_PROFILE_SCREEN.INFOR_STORE,
      },
      {
        name: 'Ngôn ngữ',
        icon: LanguageIcon,
        event: ACTION_PROFILE_SCREEN.LANGUAGE,
      },
    ],
  },
  {
    title: 'Cài đặt',
    data: [
      {
        name: 'Bảo mật',
        icon: SecurityIcon,
        event: ACTION_PROFILE_SCREEN.SECURITY,
      },
      {
        name: 'Cài đặt thông báo',
        icon: SettingNotifiIcon,
        event: ACTION_PROFILE_SCREEN.SETTING_NOTIFI,
      },
    ],
  },
  {
    title: 'Thông tin',
    data: [
      {
        name: 'Ưu đãi',
        icon: DiscountIcon,
        event: ACTION_PROFILE_SCREEN.DISCOUNT,
      },
      {
        name: 'Đánh giá',
        icon: RateIcon,
        event: ACTION_PROFILE_SCREEN.RATE,
      },
      {
        name: 'Hỗ trợ khách hàng',
        icon: SupportIcon,
        event: ACTION_PROFILE_SCREEN.SUPPORT,
      },
      {
        name: 'Về chúng tôi',
        icon: AboutIcon,
        event: ACTION_PROFILE_SCREEN.ABOUT,
      },
      {
        name: 'Chia sẻ ứng dụng',
        icon: ShareIcon,
        event: ACTION_PROFILE_SCREEN.SHARE,
      },
    ],
  },
];
