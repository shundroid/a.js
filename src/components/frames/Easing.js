import React from 'react';
import BezierEasingEditor from 'bezier-easing-editor';
import cssmodules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from '@components/frames/easing.cssmodule.styl';
import mapDispatch from '@utils/mapDispatch';

const actions = mapDispatch('updateEasing');

class Easing extends React.Component {
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

Easing.propTypes = actions.toPropTypes();

export default connect(() => ({}), actions.toConnect())(cssmodules(Easing, styles));
