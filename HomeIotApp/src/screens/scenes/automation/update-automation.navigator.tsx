import { yupResolver } from '@hookform/resolvers/yup';
import { createStackNavigator } from '@react-navigation/stack';
import { UpdateAutomationStackParamList } from '@src/configs/routes/scene.route';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useUpdateAutomationSchema } from '../schemas/automation.schema';
import AddConditionScreen from './add-condition.screen';
import AutomationActionScreen from './automation-action.screen';
import EditFunctionActionScreen from './edit-function-action.screen';
import EditFunctionConditionScreen from './edit-function-condition.screen';
import SelectFunctionActionScreen from './select-function-action.screen';
import SelectFunctionConditionScreen from './select-function-condition.screen';
import UpdateAutomationSceneScreen from './update-automation-scene.screen';

const Stack = createStackNavigator<UpdateAutomationStackParamList>();

const UpdateAutomationNavigator = () => {
  const updateSchema = useUpdateAutomationSchema();

  const form = useForm({
    resolver: yupResolver(updateSchema),
  });

  return (
    <FormProvider {...form}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="UpdateAutomation"
      >
        <Stack.Screen
          name="UpdateAutomation"
          component={UpdateAutomationSceneScreen}
        />
        <Stack.Screen
          name="UpdateAddCondition"
          component={AddConditionScreen}
        />
        <Stack.Screen
          name="UpdateAutomationAction"
          component={AutomationActionScreen}
        />
        <Stack.Screen
          name="UpdateSelectDeviceConditionFunc"
          component={SelectFunctionConditionScreen}
        />
        <Stack.Screen
          name="UpdateSelectDeviceActionFunction"
          component={SelectFunctionActionScreen}
        />
        <Stack.Screen
          name="UpdateEditDeviceConditionFunc"
          component={EditFunctionConditionScreen}
        />
        <Stack.Screen
          name="UpdateEditDeviceActionFunc"
          component={EditFunctionActionScreen}
        />
      </Stack.Navigator>
    </FormProvider>
  );
};

export default UpdateAutomationNavigator;
