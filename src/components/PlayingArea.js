import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssmodules from 'react-css-modules';
import styles from '@components/playingarea.cssmodule.styl';
import mapState from '@utils/mapState';

const props = mapState({
  'playing.isPlaying': PropTypes.bool.isRequired
});

class PlayingArea extends React.Component {
  getStyle() {
    return {
      display: this.props.isPlaying ? 'block' : 'none'
    };
  }
  render() {
    return (
      <div styleName="playing-area" style={this.getStyle()} />
    );
  }
}

PlayingArea.propTypes = props.toPropTypes();

export default connect(props.toConnect(), () => ({}))(cssmodules(PlayingArea, styles));
