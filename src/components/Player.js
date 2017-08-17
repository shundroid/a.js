import React from 'react';
import PropTypes from 'prop-types';
import styles from '@components/player.cssmodule.styl';
import allInOne from '@utils/allInOne';

const props = {
  'player.isPlaying': PropTypes.bool.isRequired,
  'player.joinedImage': PropTypes.object.isRequired,
  'player.duration': PropTypes.number.isRequired,
  'player.easing': PropTypes.string.isRequired
};

class Player extends React.Component {
  constructor(componentProps) {
    super(componentProps);
    this.animation = null;
  }
  componentDidUpdate(prevProps) {
    if (this.props.isPlaying && this.props.joinedImage !== prevProps.joinedImage) {
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
        easing: this.props.easing,
        iterations: Infinity,
      });
      this.tick();
    }
    if (!this.props.isPlaying && this.animation) {
      this.animation.cancel();
    }
    if (this.props.isPlaying) {
      if (this.props.duration !== prevProps.duration) {
        this.animation.effect.timing.duration = this.getDuration();
      }
      if (this.props.easing !== prevProps.easing) {
        this.animation.effect.timing.easing = this.props.easing;
      }
    }
  }
  getDuration() {
    return this.props.duration * this.props.joinedImage.frameCount;
  }
  getStyle() {
    return {
      display: this.props.isPlaying ? 'block' : 'none',
      backgroundImage: `url(${this.props.joinedImage})`
    };
  }
  tick = () => {
    if (this.props.isPlaying) {
      requestAnimationFrame(this.tick);
    }
    window.timing = this.animation.effect.getComputedTiming().progress;
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

export default allInOne(Player, styles, props);
