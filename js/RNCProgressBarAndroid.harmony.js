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
import {StyleSheet} from 'react-native';
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
  props: ProgressBarAndroidProps,
  forwardedRef: ?React.Ref<typeof ProgressBarAndroidNativeComponent>,
  style: any,
) => {
  const attrHeight = {
    Horizontal: 16,
    Small: 16,
    SmallInverse: 16,
    Normal: 48,
    Inverse: 48,
    Large: 76,
    LargeInverse: 76,
  };

  const height = attrHeight[props.styleAttr] ? attrHeight[props.styleAttr] : 16;
  const styles = StyleSheet.create({
    progressBar: {
      height: height,
      width: '100%',
    },
  });
  return (
    <ProgressBarAndroidNativeComponent
      {...props}
      style={[styles.progressBar, props.style]}
      ref={forwardedRef}
    />
  );
};

const ProgressBarAndroidToExport = React.forwardRef(ProgressBarAndroid);

ProgressBarAndroidToExport.defaultProps = {
  styleAttr: 'Normal',
  indeterminate: true,
  animating: true,
  color: '#008577',
};

export default (ProgressBarAndroidToExport: ProgressBarAndroidNativeComponent);
