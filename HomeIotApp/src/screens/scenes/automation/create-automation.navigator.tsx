import { yupResolver } from '@hookform/resolvers/yup';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateAutomationStackParamList } from '@src/configs/routes/scene.route';
import { EAutomationSceneConditionsType } from '@src/features/scenes/scene.model';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useCreateAutomationSchema } from '../schemas/automation.schema';
import AddConditionScreen from './add-condition.screen';
import AutomationActionScreen from './automation-action.screen';
import CreateAutomationSceneScreen from './create-automation-scene.screen';
import EditFunctionActionScreen from './edit-function-action.screen';
import EditFunctionConditionScreen from './edit-function-condition.screen';
import SelectFunctionActionScreen from './select-function-action.screen';
import SelectFunctionConditionScreen from './select-function-condition.screen';

const Stack = createStackNavigator<CreateAutomationStackParamList>();

const CreateAutomationNavigator = () => {
  const createSchema = useCreateAutomationSchema();
  const form = useForm({
    resolver: yupResolver(createSchema),
    defaultValues: {
      conditionsType: EAutomationSceneConditionsType.ALL,
    },
  });

  return (
    <FormProvider {...form}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="CreateAutomation"
      >
        <Stack.Screen
          name="CreateAutomation"
          component={CreateAutomationSceneScreen}
        />
        <Stack.Screen
          name="CreateAddCondition"
          component={AddConditionScreen}
        />
        <Stack.Screen
          name="CreateSelectDeviceConditionFunc"
          component={SelectFunctionConditionScreen}
        />
        <Stack.Screen
          name="CreateAutomationAction"
          component={AutomationActionScreen}
        />
        <Stack.Screen
          name="CreateSelectDeviceActionFunction"
          component={SelectFunctionActionScreen}
        />
        <Stack.Screen
          name="CreateEditDeviceConditionFunc"
          component={EditFunctionConditionScreen}
        />
        <Stack.Screen
          name="CreateEditDeviceActionFunc"
          component={EditFunctionActionScreen}
        />
      </Stack.Navigator>
    </FormProvider>
  );
};

export default CreateAutomationNavigator;
