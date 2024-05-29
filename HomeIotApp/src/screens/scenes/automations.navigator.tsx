import { createStackNavigator } from '@react-navigation/stack';
import { AutomationStackParamList } from '@src/configs/routes/scene.route';
import React from 'react';

import CreateAutomationNavigator from './automation/create-automation.navigator';
import UpdateAutomationNavigator from './automation/update-automation.navigator';

const AutomationStack = createStackNavigator<AutomationStackParamList>();

const AutomationNavigator = () => {
  return (
    <AutomationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AutomationStack.Screen
        name="CreateAutomationStack"
        component={CreateAutomationNavigator}
      />
      <AutomationStack.Screen
        name="UpdateAutomationStack"
        component={UpdateAutomationNavigator}
      />
    </AutomationStack.Navigator>
  );
};

export default AutomationNavigator;
