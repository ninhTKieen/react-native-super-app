import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ItemListScreen from './item-list.screen';
import CreateItemScreen from './create-item.screen';
import ItemDetailScreen from './detail-item.screen';
import CreateVariationScreen from './create-variation-item.screen';
import VariationInfoScreen from './variation-info-item.screen';
import AttributeScreen from './attribute-item.screen';
import AttributeDetailScreen from './attribute-detail-item.screen';
import ItemCategoryScreen from './category-item.screen';
import EditItemStack from './edit-screen';
import useItemSchema from '@/screens/items/schema/item-schema';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {ItemStackParamList} from '@/routes/item.route';

const Stack = createNativeStackNavigator<ItemStackParamList>();

const ItemStack = () => {
  const itemSchema = useItemSchema();

  const methods = useForm({
    resolver: yupResolver(itemSchema),
    mode: 'onChange',
  });
  return (
    <FormProvider {...methods}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'ItemList'} component={ItemListScreen} />
        <Stack.Screen name={'CreateItem'} component={CreateItemScreen} />
        <Stack.Screen name={'EditItemStack'} component={EditItemStack} />
        <Stack.Screen name={'ItemDetail'} component={ItemDetailScreen} />
        <Stack.Screen name={'ItemAttribute'} component={AttributeScreen} />
        <Stack.Screen
          name={'ItemAttributeDetail'}
          component={AttributeDetailScreen}
        />
        <Stack.Screen
          name={'CreateItemVariant'}
          component={CreateVariationScreen}
        />
        <Stack.Screen
          name={'ItemVariantInfo'}
          component={VariationInfoScreen}
        />
        <Stack.Screen name={'ItemCategory'} component={ItemCategoryScreen} />
      </Stack.Navigator>
    </FormProvider>
  );
};

export default ItemStack;
