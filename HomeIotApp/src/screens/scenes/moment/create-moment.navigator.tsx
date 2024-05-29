import { yupResolver } from '@hookform/resolvers/yup';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateMomentStackParamList } from '@src/configs/routes/scene.route';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useCreateMomentSchema } from '../schemas/moment.schema';
import ActionMomentSceneScreen from './action-moment.screen';
import CreateMomentSceneScreen from './create-moment-scene.screen';
import { ChangeDeviceFunctionScreen } from './edit-device-function.screen';
import SelectDeviceFunctionScreen from './select-device-function.screen';

const Stack = createStackNavigator<CreateMomentStackParamList>();

const CreateMomentNavigator = () => {
  const createMomentSchema = useCreateMomentSchema();

  const createForm = useForm({
    resolver: yupResolver(createMomentSchema),
  });

  return (
    <FormProvider {...createForm}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="CreateMoment" component={CreateMomentSceneScreen} />
        <Stack.Screen
          name="CreateMomentAction"
          component={ActionMomentSceneScreen}
        />
        <Stack.Screen
          name="CreateMomentSelectDeviceFunction"
          component={SelectDeviceFunctionScreen}
        />
        <Stack.Screen
          name="CreateMomentChangeDeviceFunction"
          component={ChangeDeviceFunctionScreen}
        />
      </Stack.Navigator>
    </FormProvider>
  );
};

export default CreateMomentNavigator;
