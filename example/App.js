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
import {ProgressBar} from '../js';

import RNTesterBlock from './RNTesterBlock';
import RNTesterPage from './RNTesterPage';

const MovingBar = (props) => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    setInterval(() => {
      setProgress((p) => (p + 0.02) % 1);
    }, 50);
  }, []);
  return <ProgressBar progress={progress} {...props} />;
};

const App: React.ComponentType<{}> = () => {
  return (
    <RNTesterPage title="ProgressBar Examples">
      <RNTesterBlock title="Horizontal Indeterminate ProgressBar">
        <ProgressBar styleAttr="Horizontal" />
      </RNTesterBlock>

      <RNTesterBlock title="Horizontal ProgressBar">
        <MovingBar styleAttr="Horizontal" indeterminate={false} />
      </RNTesterBlock>

      <RNTesterBlock title="Horizontal Black Indeterminate ProgressBar">
        <ProgressBar styleAttr="Horizontal" color="black" />
      </RNTesterBlock>

      <RNTesterBlock title="Horizontal Blue ProgressBar">
        <MovingBar styleAttr="Horizontal" indeterminate={false} color="blue" />
      </RNTesterBlock>
    </RNTesterPage>
  );
};

export default App;
