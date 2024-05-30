import { LogBox } from 'react-native';

if (__DEV__) {
  const ignoreWarns = [
    'EventEmitter.removeListener',
    'ViewPropTypes will be removed from React Native',
    'Could not find Fiber with id',
  ];
  LogBox.ignoreLogs(ignoreWarns);
}
