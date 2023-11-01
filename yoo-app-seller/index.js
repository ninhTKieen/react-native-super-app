/**
 * @format
 */
if (__DEV__) {
  import('./reactotronConfig').then(() => console.log('Reactotron Configured'));
}
import {AppRegistry, Text} from 'react-native';
import './ignoreWarnings';
import App from './App';
import {name as appName} from './app.json';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
AppRegistry.registerComponent(appName, () => App);
