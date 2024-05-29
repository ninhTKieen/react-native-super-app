import '@src/configs/i18n';
import { AppRegistry } from 'react-native';

import HomeIotApp from './App';
import { name as appName } from './app.json';
import './ignoreWarnings';

/**
 * @format
 */

AppRegistry.registerComponent(appName, () => HomeIotApp);
