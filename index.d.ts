import * as React from 'react';
import {ViewProps} from 'react-native';

export type ProgressBarAndroidProps = ViewProps & {
  /**
   * styleAttr: style of ProgressBar
   *
   * default: 'Normal'
   */
  styleAttr?:
    | 'Normal'
    | 'Horizontal'
    | 'Small'
    | 'Large'
    | 'Inverse'
    | 'SmallInverse'
    | 'LargeInverse';
  /**
   * color: Color of the ProgressBar
   */
  color?: string;
  /**
   * indeterminate: boolean flag for indeterminate mode.
   *
   * Use indeterminate mode for the progress bar when you do not know how long an operation will take. Indeterminate mode is the default for progress bar and shows a cyclic animation without a specific amount of progress indicated.
   *
   * default: false
   */
  indeterminate?: boolean;
  /**
   * progress: sets the amount of progress in 0-100.
   *
   * 25 will show that a progress bar is 25% complete
   */
  progress?: number;
  /**
   * animating: weather ProgressBar is animated or not.
   *
   * default: true
   */
  animating?: boolean;
};
export class ProgressBar extends React.Component<ProgressBarAndroidProps> {}
