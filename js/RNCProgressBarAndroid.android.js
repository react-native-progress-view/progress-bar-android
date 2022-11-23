/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

import React from 'react';
import {processColor} from 'react-native';

import ProgressBarAndroidNativeComponent from './RNCProgressBarAndroidNativeComponent';
import type {ProgressBarAndroidProps} from './types';
/**
 * React component that wraps the Android-only `ProgressBar`. This component is
 * used to indicate that the app is loading or there is activity in the app.
 *
 * Example:
 *
 * ```
 * render: function() {
 *   var progressBar =
 *     <View style={styles.container}>
 *       <ProgressBar styleAttr="Inverse" />
 *     </View>;

 *   return (
 *     <MyLoadingComponent
 *       componentView={componentView}
 *       loadingView={progressBar}
 *       style={styles.loadingComponent}
 *     />
 *   );
 * },
 * ```
 */
const ProgressBarAndroid = (
  {color, ...rest}: ProgressBarAndroidProps,
  forwardedRef: ?React.Ref<typeof ProgressBarAndroidNativeComponent>,
) => {
  return (
    <ProgressBarAndroidNativeComponent
      color={processColor(color)}
      {...rest}
      ref={forwardedRef}
    />
  );
};

const ProgressBarAndroidToExport = React.forwardRef(ProgressBarAndroid);

ProgressBarAndroidToExport.defaultProps = {
  styleAttr: 'Normal',
  indeterminate: true,
  animating: true,
};

export default (ProgressBarAndroidToExport: ProgressBarAndroidNativeComponent);
