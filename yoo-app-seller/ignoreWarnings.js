import {LogBox} from 'react-native';

if (__DEV__) {
  const ignoreWarns = [
    'EventEmitter.removeListener',
    'ViewPropTypes will be removed from React Native',
    'VirtualizedLists should never be nested inside plain ScrollViews',
  ];
  LogBox.ignoreLogs(ignoreWarns);
}
