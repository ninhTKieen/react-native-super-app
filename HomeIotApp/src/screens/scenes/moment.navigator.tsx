import { createStackNavigator } from '@react-navigation/stack';
import { MomentStackParamList } from '@src/configs/routes/scene.route';
import React from 'react';

import CreateMomentNavigator from './moment/create-moment.navigator';
import UpdateMomentNavigator from './moment/update-moment.navigator';

const MomentStack = createStackNavigator<MomentStackParamList>();

const MomentNavigator = () => {
  return (
    <MomentStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MomentStack.Screen
        name="CreateMomentStack"
        component={CreateMomentNavigator}
      />
      <MomentStack.Screen
        name="UpdateMomentStack"
        component={UpdateMomentNavigator}
      />
    </MomentStack.Navigator>
  );
};

export default MomentNavigator;
