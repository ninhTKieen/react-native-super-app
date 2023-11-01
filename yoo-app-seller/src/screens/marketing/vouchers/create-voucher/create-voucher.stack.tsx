import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  CreateVoucherStackParamList,
  VoucherStackParamList,
} from '@/routes/marketing.route';
import CreateVoucherScreen from './voucher-create.screen';
import VoucherChooseItemScreen from './voucher-choose-item.screen';
import {FormProvider, useForm} from 'react-hook-form';
import {IVoucherCreate} from '@/features/voucher/voucher.model';
import {usePromotionCreateValidator} from '@/validators/voucher/voucher.validator';
import {useCurrentStore} from '@/hooks/useCurrentStore';
import {now} from 'moment';

const Stack = createNativeStackNavigator<CreateVoucherStackParamList>();

type Props = NativeStackScreenProps<
  VoucherStackParamList,
  'CreateVoucherStack'
>;

const CreateVoucherStack = ({route}: Props) => {
  const {currentStoreInfor} = useCurrentStore();
  const methods = useForm<IVoucherCreate>({
    resolver: usePromotionCreateValidator(),
    defaultValues: {
      name: '',
      tenantId: 0,
      discountType: 1,
      type: 1,
      scope: 1,
      dateStart: new Date().toISOString(),
      dateEnd: new Date(now() + 86400000 * 7).toISOString(),
      isAdminCreated: false,
      providerId: currentStoreInfor?.id,
      descriptions: 'string',
      maxPrice: 0,
      discountAmount: 0,
      minBasketPrice: 0,
      percentage: 0,
      quantity: 10,
      maxDistributionBuyer: 1,
      listItems: [],
    },
  });
  return (
    <FormProvider {...methods}>
      <Stack.Navigator
        initialRouteName="CreateVoucherScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="CreateVoucherScreen"
          component={CreateVoucherScreen}
        />
        <Stack.Screen
          name="VoucherChooseItem"
          component={VoucherChooseItemScreen}
        />
      </Stack.Navigator>
    </FormProvider>
  );
};

export default CreateVoucherStack;
