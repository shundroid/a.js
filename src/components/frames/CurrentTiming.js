import React from 'react';
import PropTypes from 'prop-types';
import styles from '@components/frames/currenttiming.cssmodule.styl';
import config from '@config';
import allInOne from '@utils/allInOne';

const props = {
  'player.isPlaying': PropTypes.bool.isRequired,
  'player.duration': PropTypes.number.isRequired,
  'canvas.frames': PropTypes.array.isRequired
};

class CurrentTiming extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timing: 0 };
  }
  componentDidUpdate(prevProps) {
    if (this.props.isPlaying && !prevProps.isPlaying) {
      this.tick();
    }
  }
  tick = () => {
    if (this.props.isPlaying) {
      requestAnimationFrame(this.tick);
    }
    this.setState({ timing: window.timing });
  }
  getLeft() {
    return `${this.state.timing * 100}%`;
  }
  getStyle() {
    return {
      left: this.getLeft(),
      display: this.props.isPlaying ? 'block' : 'none'
    };
  }
  render() {
    return (
      <div styleName="timing" style={this.getStyle()} />
    );
  }
}

export default allInOne(CurrentTiming, styles, props);
