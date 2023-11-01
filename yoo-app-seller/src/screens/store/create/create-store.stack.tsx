import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CreateStoreStackParamList,
  PartnerStoreStackParamList,
} from '@/routes/store.route';
import {FormProvider, useForm} from 'react-hook-form';
import {IStoreCreate} from '@/features/store/store.model';
import {useStoreCreateValidator} from '@/validators/store/store.validator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import StoreCreateScreen from './create-store.screen';
import CreateHtmlScreen from './create-store-html.screen';

type Props = NativeStackScreenProps<
  PartnerStoreStackParamList,
  'CreateStoreStack'
>;

const Stack = createNativeStackNavigator<CreateStoreStackParamList>();
const CreateStoreStack = ({}: Props) => {
  const methods = useForm<IStoreCreate>({
    resolver: useStoreCreateValidator(),
    defaultValues: {
      longitude: 106.660172,
      latitude: 10.762622,
      description: '',
    },
  });
  return (
    <FormProvider {...methods}>
      <Stack.Navigator
        initialRouteName="CreateMainPage"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'CreateMainPage'} component={StoreCreateScreen} />
        <Stack.Screen name={'CreateDescription'} component={CreateHtmlScreen} />
      </Stack.Navigator>
    </FormProvider>
  );
};

export default CreateStoreStack;
