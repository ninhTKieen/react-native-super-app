import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FormProvider, useForm} from 'react-hook-form';
import {ItemBookingStackParamList} from '@/routes/item-booking.route';
import {yupResolver} from '@hookform/resolvers/yup';
import ItemListBookingScreen from './item-list-booking.screen';
import CreateItemBookingScreen from './create-item-booking.screen';
import AttributeCreateItemBookingScreen from './attribute-create-item-booking.screen';
import ArrayObjectAttributeCreateScreen from './array-object-attribute-create.screen';
import {useAppSelector} from '@/hooks/redux.hook';
import {selectCurrentStoreInfor} from '@/features/store/store.slice';
import ItemBookingDetailScreen from './item-booking-detail.screen';
import {useItemBookingSchema} from './schema/item-booking-schema';

const Stack = createNativeStackNavigator<ItemBookingStackParamList>();
const ItemBookingStack = () => {
  const currentStoreInfor = useAppSelector(selectCurrentStoreInfor);
  const itemBookingSchema = useItemBookingSchema({
    typeStore: currentStoreInfor?.type || 0,
  });
  const methods = useForm({
    resolver: yupResolver(itemBookingSchema),
    mode: 'onChange',
    defaultValues: {
      type: currentStoreInfor?.type || 0,
      // properties: {},
    },
  });

  return (
    <FormProvider {...methods}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name={'ItemBookingList'}
          component={ItemListBookingScreen}
        />
        <Stack.Screen
          name={'CreateItemBooking'}
          component={CreateItemBookingScreen}
        />
        <Stack.Screen
          name={'AttributeCreateItemBooking'}
          component={AttributeCreateItemBookingScreen}
        />
        <Stack.Screen
          name={'ArrayObjectAttributeCreate'}
          component={ArrayObjectAttributeCreateScreen}
        />
        <Stack.Screen
          name={'ItemBookingDetail'}
          component={ItemBookingDetailScreen}
        />
      </Stack.Navigator>
    </FormProvider>
  );
};

export default ItemBookingStack;
