import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '@components/frames/currenttiming.cssmodule.styl';
import mapState from '@utils/mapState';
import config from '@config';

const props = mapState({
  'player.isPlaying': PropTypes.bool.isRequired,
  'player.duration': PropTypes.number.isRequired,
  'canvas.frames': PropTypes.array.isRequired
});

class CurrentTiming extends React.Component {
  getLeft() {
    return `${this.props.timing * config.thumbnailWidth * this.props.frames.length}px`;
  }
  getStyle() {
    return {
      left: this.getLeft()
    };
  }
  render() {
    return (
      <div styleName="timing" style={this.getStyle()} />
    );
  }
}

CurrentTiming.propTypes = {
  ...props.toPropTypes(),
  timing: PropTypes.number
};

export default connect(props.toConnect(), () => ({}))(cssmodules(CurrentTiming, styles));
