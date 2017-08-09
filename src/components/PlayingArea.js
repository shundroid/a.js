import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssmodules from 'react-css-modules';
import styles from '@components/playingarea.cssmodule.styl';
import mapState from '@utils/mapState';

const props = mapState({
  'playing.isPlaying': PropTypes.bool.isRequired,
  'playing.joinedImage': PropTypes.string.isRequired
});

class PlayingArea extends React.Component {
  getStyle() {
    return {
      display: this.props.isPlaying ? 'block' : 'none',
      backgroundImage: `url(${this.props.joinedImage})`
    };
  }
  render() {
    return (
      <div styleName="playing-area" style={this.getStyle()}>
      </div>
    );
  }
}

PlayingArea.propTypes = props.toPropTypes();

export default connect(props.toConnect(), () => ({}))(cssmodules(PlayingArea, styles));
