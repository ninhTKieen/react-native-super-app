import {useAppSelector} from './redux.hook';
import {useQuery} from '@tanstack/react-query';

import {selectCurrentStore} from '@/features/store/store.slice';
import storeService from '@/features/store/store.service';
import Toast from 'react-native-toast-message';
import i18n from 'i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';

export const useCurrentStore = () => {
  const currentStore = useAppSelector(selectCurrentStore);

  const {isLoading, data: currentStoreInfor} = useQuery({
    queryKey: ['currentStoreInfo', currentStore],
    queryFn: () => storeService.getProviderById({id: currentStore}),
    retry(failureCount, error) {
      if (!error || failureCount > 3) {
        return false;
      } else {
        Toast.show({
          type: 'error',
          text1: (i18n.t(i18nKeys.common.error) as string).toUpperCase(),
          text2: (i18n.t(i18nKeys.common.plsTryAgain) as string).toUpperCase(),
        });
        return true;
      }
    },
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
  });

  return {currentStore, currentStoreInfor, isLoading};
};
