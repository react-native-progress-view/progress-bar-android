import * as React from 'react';
import renderer from 'react-test-renderer';
import ProgressBar from '../RNCProgressBarAndroid.android';

describe('<ProgressBar />', () => {
  it('renders enabled ProgressBar', () => {
    const tree = renderer.create(<ProgressBar />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Horizontal ProgressBar', () => {
    const tree = renderer
      .create(<ProgressBar styleAttr="Horizontal" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Inverse ProgressBar', () => {
    const tree = renderer.create(<ProgressBar typeAttr="Inverse" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
