import React from 'react';
import BezierEasingEditor from 'bezier-easing-editor';
import cssmodules from 'react-css-modules';
import styles from '@components/frames/easing.cssmodule.styl';

class Easing extends React.Component {
  change = value => {
    console.log(value);
  }
  render() {
    return (
      <div styleName="easing">
        <BezierEasingEditor onChange={this.change} />
      </div>
    );
  }
}

export default cssmodules(Easing, styles);
