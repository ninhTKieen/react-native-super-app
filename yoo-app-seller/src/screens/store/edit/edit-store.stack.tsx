import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  EditStoreStackParamList,
  PartnerStoreStackParamList,
} from '@/routes/store.route';
import EditStoreScreen from './edit-store.screen';
import EditHtmlScreen from './edit-html.screen';
import {FormProvider, useForm} from 'react-hook-form';
import {IStoreUpdate} from '@/features/store/store.model';
import {useStoreUpdateValidator} from '@/validators/store/store.validator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<
  PartnerStoreStackParamList,
  'EditStoreStack'
>;

const Stack = createNativeStackNavigator<EditStoreStackParamList>();
const EditStoreStack = ({route: {params}}: Props) => {
  const {inforStore} = params.params as any;

  const methods = useForm<IStoreUpdate>({
    resolver: useStoreUpdateValidator(),
    defaultValues: {
      ...inforStore,
    },
  });
  return (
    <FormProvider {...methods}>
      <Stack.Navigator
        initialRouteName="EditMainPage"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'EditMainPage'} component={EditStoreScreen} />
        <Stack.Screen name={'EditDescription'} component={EditHtmlScreen} />
      </Stack.Navigator>
    </FormProvider>
  );
};

export default EditStoreStack;
