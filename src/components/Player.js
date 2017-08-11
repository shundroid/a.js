import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssmodules from 'react-css-modules';
import styles from '@components/player.cssmodule.styl';
import mapState from '@utils/mapState';

const props = mapState({
  'player.isPlaying': PropTypes.bool.isRequired,
  'player.joinedImage': PropTypes.object.isRequired,
  'player.duration': PropTypes.number.isRequired
});

class Player extends React.Component {
  constructor(componentProps) {
    super(componentProps);
    this.animation = null;
  }
  getDuration() {
    return this.props.duration * this.props.joinedImage.frameCount;
  }
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
      this.animation = this.element.animate(keyframes, {
        duration: this.getDuration(),
        easing: 'linear',
        iterations: Infinity,
      });
    }
    if (!this.props.isPlaying && this.animation) {
      this.animation.cancel();
    }
    if (this.props.isPlaying && this.props.duration !== prevProps.duration) {
      this.animation.effect.timing.duration = this.getDuration();
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
        styleName="player"
        style={this.getStyle()}
        ref={element => { this.element = element; }} />
    );
  }
}

Player.propTypes = props.toPropTypes();

export default connect(props.toConnect(), () => ({}))(cssmodules(Player, styles));
