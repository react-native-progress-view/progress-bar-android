/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import type {ViewProps, Double, WithDefault} from 'react-native';

type NativeProps = $ReadOnly<{|
  ...ViewProps,

  //Props
  styleAttr?: string,
  indeterminate: boolean,
  progress?: WithDefault<Double, 0>,
  animating?: WithDefault<boolean, true>,
  color?: ?ColorValue,
|}>;

// $FlowFixMe Fix react-native version in the repository as the option type is old
export default codegenNativeComponent<NativeProps>('RNCProgressBar', {
  interfaceOnly: true,
  excludedPlatforms: ['iOS'],
});
