import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useRoute, RouteProp} from '@react-navigation/native';

import EditItemScreen from './main.screen';
import EditVariationInfoScreen from './edit-variation-info.screen';
import {EditItemStackParamList} from '@/routes/item.route';
import {FormProvider, useForm} from 'react-hook-form';
import useUpdateItemSchema from '@/screens/items/schema/update-item-schema';
import {yupResolver} from '@hookform/resolvers/yup';

const Stack = createNativeStackNavigator<EditItemStackParamList>();

type EditItemScreenRouteProp = RouteProp<EditItemStackParamList, 'EditItem'>;

const EditItemStack = () => {
  const route = useRoute<EditItemScreenRouteProp>();
  const updateItemSchema = useUpdateItemSchema();
  const item = route.params.item;
  const methods = useForm({
    defaultValues: item,
    resolver: yupResolver(updateItemSchema),
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="EditItem">
        <Stack.Screen
          name={'EditItem'}
          component={EditItemScreen}
          initialParams={{
            item: item,
          }}
        />
        <Stack.Screen
          name={'EditVariantInfo'}
          component={EditVariationInfoScreen}
        />
      </Stack.Navigator>
    </FormProvider>
  );
};

export default EditItemStack;
