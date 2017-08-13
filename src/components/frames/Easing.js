import React from 'react';
import BezierEasingEditor from 'bezier-easing-editor';
import cssmodules from 'react-css-modules';
import styles from '@components/frames/easing.cssmodule.styl';

class Easing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false };
  }
  toggle = () => {
    this.setState({ isShow: !this.state.isShow });
  }
  change = value => {
    console.log(value);
  }
  getStyle() {
    return {
      display: this.state.isShow ? 'block' : 'none'
    };
  }
  render() {
    return (
      <div styleName="easing">
        <button styleName="easing-button" onClick={this.toggle}>E</button>
        <BezierEasingEditor
          onFinish={this.change}
          styleName="easing-editor"
          style={this.getStyle()} />
      </div>
    );
  }
}

export default cssmodules(Easing, styles);
