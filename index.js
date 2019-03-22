/** @format */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Encountered an error loading page',    
    'Deprecation warning:',
    'Task orphaned for request ',
    'Remote debugger',
    'Possible',
    'Require cycle:',
    'Require cycles are allowed, ',
    'source.uri'
])
AppRegistry.registerComponent(appName, () => App);
