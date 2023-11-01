import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  UpdateVoucherStackParamList,
  VoucherStackParamList,
} from '@/routes/marketing.route';
import {FormProvider, useForm} from 'react-hook-form';
import {IVoucherUpdate} from '@/features/voucher/voucher.model';
import {useVoucherUpdateValidator} from '@/validators/voucher/voucher.validator';
// import {useCurrentStore} from '@/hooks/useCurrentStore';
import {now} from 'moment';
import VoucherChooseItemUpdateScreen from './voucher-choose-item-update.screen';
import UpdateVoucherScreen from './voucher-detail.screen';

const Stack = createNativeStackNavigator<UpdateVoucherStackParamList>();

type Props = NativeStackScreenProps<
  VoucherStackParamList,
  'UpdateVoucherStack'
>;

const UpdateVoucherStack = ({route: {params}}: Props) => {
  //   const {currentStoreInfor} = useCurrentStore();
  const voucherInfo = params.params ? params.params.voucherInfo : undefined;

  const methods = useForm<IVoucherUpdate>({
    resolver: useVoucherUpdateValidator(),
    defaultValues: {
      name: voucherInfo?.name,
      type: voucherInfo?.type ?? 1,
      scope: voucherInfo?.scope ?? 1,
      //   discountType: 1,
      dateStart: voucherInfo?.dateStart ?? new Date().toISOString(),
      dateEnd:
        voucherInfo?.dateEnd ?? new Date(now() + 86400000 * 7).toISOString(),
      //   providerId: currentStoreInfor?.id,
      descriptions: voucherInfo?.descriptions ?? '',
      maxPrice: voucherInfo?.maxPrice ?? 0,
      discountAmount: voucherInfo?.discountAmount ?? 0,
      minBasketPrice: voucherInfo?.minBasketPrice ?? 0,
      percentage: voucherInfo?.percentage ?? 0,
      quantity: voucherInfo?.quantity ?? 10,
      maxDistributionBuyer: voucherInfo?.maxDistributionBuyer ?? 1,
      listItems: voucherInfo?.listItems,
    },
  });
  return (
    <FormProvider {...methods}>
      <Stack.Navigator
        initialRouteName="UpdateVoucherScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="UpdateVoucherScreen"
          component={UpdateVoucherScreen}
        />
        <Stack.Screen
          name="UpdateChooseItem"
          component={VoucherChooseItemUpdateScreen}
        />
      </Stack.Navigator>
    </FormProvider>
  );
};

export default UpdateVoucherStack;
