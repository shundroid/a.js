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
const actions = ['updateAnimation'];

class Player extends React.Component {
  constructor(componentProps) {
    super(componentProps);
    this.animation = null;
  }
  componentDidUpdate(prevProps) {
    if (this.props.isPlaying && this.props.joinedImage.frameCount > 1) {
      if (!prevProps.isPlaying) {
        this.animate();
      }
      if (this.props.joinedImage !== prevProps.joinedImage) {
        if (this.animation) this.animation.cancel();
        this.animate();
      }
    }
    if (!this.props.isPlaying && this.animation) {
      this.animation.cancel();
    }
    if (this.props.isPlaying && this.animation) {
      if (this.props.duration !== prevProps.duration) {
        this.animation.effect.timing.duration = this.getDuration();
      }
      if (this.props.easing !== prevProps.easing) {
        this.animation.effect.timing.easing = this.props.easing;
      }
      this.animation.currentTime = 0;
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
  animate() {
    this.element.style.backgroundImage = `url(${this.props.joinedImage.image})`;
    const keyframes = [
      {
        backgroundPositionX: '0px',
        easing: `steps(${this.props.joinedImage.frameCount}, end)`
      },
      {
        backgroundPositionX: `-${(this.props.joinedImage.frameCount) * this.props.joinedImage.width}px`
      }
    ];
    this.animation = this.element.animate(keyframes, {
      duration: this.getDuration(),
      easing: this.props.easing,
      iterations: Infinity,
    });
    this.props.actions.updateAnimation(this.animation);
  }
  render() {
    return (
      <div
        styleName="player"
        id="player"
        style={this.getStyle()}
        ref={element => { this.element = element; }} />
    );
  }
}

export default allInOne(Player, styles, props, actions);
