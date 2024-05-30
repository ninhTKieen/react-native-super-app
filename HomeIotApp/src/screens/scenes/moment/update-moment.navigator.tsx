import { yupResolver } from '@hookform/resolvers/yup';
import { createStackNavigator } from '@react-navigation/stack';
import { UpdateMomentStackParamList } from '@src/configs/routes/scene.route';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useUpdateMomentSchema } from '../schemas/moment.schema';
import ActionMomentSceneScreen from './action-moment.screen';
import EditDeviceFunctionScreen from './edit-device-function.screen';
import EditMomentSceneScreen from './edit-moment-scene.screen';
import SelectDeviceFunctionScreen from './select-device-function.screen';

const Stack = createStackNavigator<UpdateMomentStackParamList>();

const UpdateMomentNavigator = () => {
  const updateMomentSchema = useUpdateMomentSchema();

  const updateForm = useForm({
    resolver: yupResolver(updateMomentSchema),
  });

  return (
    <FormProvider {...updateForm}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="UpdateMoment" component={EditMomentSceneScreen} />
        <Stack.Screen
          name="UpdateMomentEditDeviceFunction"
          component={EditDeviceFunctionScreen}
        />
        <Stack.Screen
          name="UpdateMomentAction"
          component={ActionMomentSceneScreen}
        />
        <Stack.Screen
          name="UpdateMomentSelectDeviceFunction"
          component={SelectDeviceFunctionScreen}
        />
      </Stack.Navigator>
    </FormProvider>
  );
};

export default UpdateMomentNavigator;
