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
import createReactClass from 'create-react-class';
import RNTesterBlock from './RNTesterBlock';
import RNTesterPage from './RNTesterPage';

import TimerMixin from 'react-timer-mixin';

const MovingBar = createReactClass({
  displayName: 'MovingBar',
  mixins: [TimerMixin],

  getInitialState: function () {
    return {
      progress: 0,
    };
  },

  componentDidMount: function () {
    this.setInterval(() => {
      var progress = (this.state.progress + 0.02) % 1;
      this.setState({progress: progress});
    }, 50);
  },

  render: function () {
    return <ProgressBar progress={this.state.progress} {...this.props} />;
  },
});

const App: React.ComponentType<{}> = () => {
  return (
    <RNTesterPage title="ProgressBar Examples">
      <RNTesterBlock title="Horizontal Indeterminate ProgressBar">
        {/* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
         * found when making Flow check .android.js files. */}
        <ProgressBar styleAttr="Horizontal" />
      </RNTesterBlock>

      <RNTesterBlock title="Horizontal ProgressBar">
        <MovingBar styleAttr="Horizontal" indeterminate={false} />
      </RNTesterBlock>

      <RNTesterBlock title="Horizontal Black Indeterminate ProgressBar">
        {/* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
         * found when making Flow check .android.js files. */}
        <ProgressBar styleAttr="Horizontal" color="black" />
      </RNTesterBlock>

      <RNTesterBlock title="Horizontal Blue ProgressBar">
        <MovingBar styleAttr="Horizontal" indeterminate={false} color="blue" />
      </RNTesterBlock>
    </RNTesterPage>
  );
};

export default App;
