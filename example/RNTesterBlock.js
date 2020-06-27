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
import {StyleSheet, Text, View} from 'react-native';

type Props = $ReadOnly<{
  title?: string,
  description?: string,
  children: React.Node,
}>;
const RNTesterBlock: React.ComponentType<Props> = ({
  title,
  description,
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
        {description ? (
          <Text style={styles.descriptionText}>{description}</Text>
        ) : null}
      </View>
      <View style={styles.children}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#ffffff',
    margin: 10,
    marginVertical: 5,
    overflow: 'hidden',
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 2.5,
    borderBottomColor: '#d6d7da',
    backgroundColor: '#f6f7f8',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 14,
  },
  children: {
    margin: 10,
  },
});

export default RNTesterBlock;
