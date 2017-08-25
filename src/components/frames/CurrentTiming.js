import React from 'react';
import PropTypes from 'prop-types';
import styles from '@components/frames/currenttiming.cssmodule.styl';
import allInOne from '@utils/allInOne';

const props = {
  'player.isPlaying': PropTypes.bool.isRequired,
  'player.duration': PropTypes.number.isRequired,
  'player.animation': PropTypes.object,
  'canvas.frames': PropTypes.array.isRequired
};

class CurrentTiming extends React.Component {
  constructor(componentProps) {
    super(componentProps);
    this.state = { timing: 0 };
  }
  componentDidUpdate(prevProps) {
    if (this.isEnabled() && this.props.isPlaying && !prevProps.isPlaying) {
      this.tick();
    }
  }
  getLeft() {
    return `${this.state.timing * 100}%`;
  }
  getStyle() {
    return {
      left: this.getLeft(),
      display: this.isEnabled() && this.props.isPlaying ? 'block' : 'none'
    };
  }
  isEnabled() {
    return this.props.animation &&
      this.props.animation.effect && this.props.animation.effect.getComputedTiming;
  }
  tick = () => {
    if (this.props.isPlaying) {
      requestAnimationFrame(this.tick);
    }
    if (this.props.animation) {
      this.setState({ timing: this.props.animation.effect.getComputedTiming().progress });
    }
  }
  render() {
    return (
      <div styleName="timing" style={this.getStyle()} />
    );
  }
}

export default allInOne(CurrentTiming, styles, props);
