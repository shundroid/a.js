import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssmodules from 'react-css-modules';
import styles from '@components/playingarea.cssmodule.styl';
import mapState from '@utils/mapState';

const props = mapState({
  'playing.isPlaying': PropTypes.bool.isRequired,
  'playing.joinedImage': PropTypes.object.isRequired
});

class PlayingArea extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.joinedImage !== prevProps.joinedImage) {
      if (this.props.joinedImage.image === null) return;

      this.element.style.backgroundImage = `url(${this.props.joinedImage.image})`;
      const keyframes = [];
      for (let i = 0; i < this.props.joinedImage.frameCount; i++) {
        const keyframe = {
          offset: i / this.props.joinedImage.frameCount,
          easing: 'steps(1, end)',
          backgroundPositionX: `${-i * this.props.joinedImage.width}px`
        };
        keyframes.push(keyframe);
      }
      this.element.animate(keyframes, {
        duration: 2000,
        easing: 'linear',
        iterations: Infinity,
      });
    }
  }
  getStyle() {
    return {
      display: this.props.isPlaying ? 'block' : 'none',
      backgroundImage: `url(${this.props.joinedImage})`
    };
  }
  render() {
    return (
      <div
        styleName="playing-area"
        style={this.getStyle()}
        ref={element => { this.element = element; }} />
    );
  }
}

PlayingArea.propTypes = props.toPropTypes();

export default connect(props.toConnect(), () => ({}))(cssmodules(PlayingArea, styles));
