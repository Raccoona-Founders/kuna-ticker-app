import 'node-libs-react-native/globals';
import 'crypto';

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Application } from './src/app';

AppRegistry.registerComponent(appName, () => Application);
