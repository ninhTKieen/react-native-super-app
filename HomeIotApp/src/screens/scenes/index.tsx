import { createStackNavigator } from '@react-navigation/stack';
import { SceneRouteStackParamList } from '@src/configs/routes/scene.route';
import React from 'react';

import AutomationNavigator from './automations.navigator';
import MainSceneScreen from './main-scene.screen';
import MomentNavigator from './moment.navigator';

const SceneStack = createStackNavigator<SceneRouteStackParamList>();

const SceneNavigator = () => {
  return (
    <SceneStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SceneStack.Screen name="MainScene" component={MainSceneScreen} />
      <SceneStack.Screen name="MomentScene" component={MomentNavigator} />
      <SceneStack.Screen
        name="AutomationScene"
        component={AutomationNavigator}
      />
    </SceneStack.Navigator>
  );
};

export default SceneNavigator;
