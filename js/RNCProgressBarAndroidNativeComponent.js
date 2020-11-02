/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

import {requireNativeComponent} from 'react-native';
import type {HostComponent, ViewProps, Double, WithDefault} from 'react-native';

type NativeProps = $ReadOnly<{|
  ...ViewProps,

  //Props
  styleAttr?: string,
  typeAttr?: string,
  indeterminate: boolean,
  progress?: WithDefault<Double, 0>,
  animating?: WithDefault<boolean, true>,
  color?: ?string,
  testID?: ?string,
|}>;

export default (requireNativeComponent<NativeProps>(
  'RNCProgressBar',
): HostComponent<NativeProps>);
