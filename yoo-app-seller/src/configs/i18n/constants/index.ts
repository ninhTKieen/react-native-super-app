import {useTranslation} from 'react-i18next';
import {
  providerBusinessGroupTypesEn,
  providerBusinessTypesEn,
} from './supplier-type-en';
import {
  ISupplierType,
  providerBusinessGroupsTypesVi,
  providerBusinessTypesVi,
} from './supplier-type-vi';

export const checkType = (language: string, groupType: number): any[] => {
  if (language === 'vi') {
    const res = providerBusinessTypesVi.filter(item => {
      if (Math.floor(Math.floor(item.value / 100)) === groupType) {
        return item;
      }
      if (groupType === 2 && item.value === 4) {
        return item;
      }
    });
    return res;
  } else {
    const res = providerBusinessTypesEn.filter(item => {
      if (Math.floor(Math.floor(item.value / 100)) === groupType) {
        return item;
      }
      if (groupType === 2 && item.value === 4) {
        return item;
      }
    });
    return res;
  }
};

export const checkGroupType = (language: string): ISupplierType[] => {
  if (language === 'vi') {
    return providerBusinessGroupsTypesVi;
  } else {
    return providerBusinessGroupTypesEn;
  }
};

export const useGetGroupType = (groupType?: number): string => {
  const {i18n} = useTranslation();

  if (i18n.language === 'vi') {
    return providerBusinessGroupsTypesVi.filter(
      item => item.value === groupType,
    )[0].label;
  } else {
    return providerBusinessGroupTypesEn.filter(
      item => item.value === groupType,
    )[0].label;
  }
};

export const useGetType = (type?: number): string => {
  const {i18n} = useTranslation();

  if (i18n.language === 'vi') {
    return providerBusinessTypesVi.filter(item => item.value === type)[0].label;
  } else {
    return providerBusinessTypesEn.filter(item => item.value === type)[0].label;
  }
};
