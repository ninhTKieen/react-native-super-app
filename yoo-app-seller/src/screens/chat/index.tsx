import React, {useLayoutEffect} from 'react';

// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatStackParamList} from '@/routes/chat.route';
import ListCustomerChatScreen from './list-customer-chat.screen';
import SearchCustomerChatScreen from './search-customer-chat.screen';
import ChatboxScreen from './chatbox.screen';
import {
  NavigationProp,
  RouteProp,
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

const Stack = createNativeStackNavigator<ChatStackParamList>();

const ChatStack = () => {
  const route = useRoute<RouteProp<ChatStackParamList>>();
  const navigation = useNavigation<NavigationProp<ChatStackParamList>>();
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'ChatboxScreen') {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [route, navigation]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={'ListCustomerChatScreen'}
        component={ListCustomerChatScreen}
      />
      <Stack.Screen
        name={'SearchCustomerChatScreen'}
        component={SearchCustomerChatScreen}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      <Stack.Screen name={'ChatboxScreen'} component={ChatboxScreen} />
    </Stack.Navigator>
  );
};

export default ChatStack;
