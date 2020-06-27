/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import RNTesterTitle from './RNTesterTitle';

type Props = $ReadOnly<{
  noScroll?: boolean,
  noSpacer?: boolean,
  title?: string,
  children: React.Node,
}>;

const RNTesterPage: React.ComponentType<Props> = ({
  noScroll,
  noSpacer,
  title,
  children,
}) => {
  let ContentWrapper;
  let wrapperProps = {};
  if (noScroll) {
    ContentWrapper = ((View: any): React.ComponentType<any>);
  } else {
    ContentWrapper = (ScrollView: React.ComponentType<any>);
    // $FlowFixMe found when converting React.createClass to ES6
    wrapperProps.automaticallyAdjustContentInsets = !title;
    wrapperProps.keyboardShouldPersistTaps = 'handled';
    wrapperProps.keyboardDismissMode = 'interactive';
  }

  return (
    <View style={styles.container}>
      {title ? <RNTesterTitle title={title} /> : null}
      <ContentWrapper style={styles.wrapper} {...wrapperProps}>
        {children}
        {noSpacer ? null : <View style={styles.spacer} />}
      </ContentWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e9eaed',
    flex: 1,
  },
  spacer: {
    height: 270,
  },
  wrapper: {
    flex: 1,
    paddingTop: 10,
  },
});

export default RNTesterPage;
