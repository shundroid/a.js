import React from 'react';
import BezierEasingEditor from 'bezier-easing-editor';
import PaletteButton from '@components/palette/PaletteButton';
import styles from '@components/palette/easingbutton.cssmodule.styl';
import allInOne from '@utils/allInOne';

const actions = ['updateEasing'];

class EasingButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false };
  }
  getStyle() {
    return {
      display: this.state.isShow ? 'block' : 'none'
    };
  }
  change = value => {
    this.props.actions.updateEasing(`cubic-bezier(${value[0]}, ${value[1]}, ${value[2]}, ${value[3]})`);
  }
  toggle = () => {
    this.setState({ isShow: !this.state.isShow });
  }
  render() {
    return (
      <div styleName="easing-parent">
        <PaletteButton
          icon="fa-area-chart"
          onClick={this.toggle} />
        <BezierEasingEditor
          onFinish={this.change}
          styleName="easing-editor"
          background="#212121"
          gridColor="#616161"
          handleColor="#1de9b6"
          curveColor="#64ffda"
          handleRadius={20}
          style={this.getStyle()} />
      </div>
    );
  }
}

export default allInOne(EasingButton, styles, {}, actions);
