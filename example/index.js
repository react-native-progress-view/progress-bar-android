import React from 'react';
import {AppRegistry} from 'react-native';

import {name as appName}  from './app.json';
import ProgressBarAndroidExample from "./ProgressBarAndroidExample.android";

class ExampleApp extends React.Component<{}> {
  render() {
    return (
        <ProgressBarAndroidExample />
    )
  }
}
AppRegistry.registerComponent(appName, () => ExampleApp);