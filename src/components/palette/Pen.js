import React from 'react';
import PropTypes from 'prop-types';
import styles from '@components/palette/pen.cssmodule.styl';
import allInOne from '@utils/allInOne';
import config from '@config';

const props = {
  'palette.color': PropTypes.string.isRequired
};
const actions = ['changeColor'];

class Pen extends React.Component {
  static toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
  constructor(componentProps) {
    super(componentProps);
    this.fullscreenCount = 0;
    this.firstTime = null;
  }
  changeColor = () => {
    this.props.actions.changeColor(this.props.originalColor);
    if (this.props.originalColor === config.fullscreenColor) {
      if (this.fullscreenCount === 0 ||
          Date.now() - this.firstTime >= config.fullscreenTimeout) {
        // reset
        this.firstTime = Date.now();
        this.fullscreenCount = 0;
      }
      this.fullscreenCount++;
      if (this.fullscreenCount >= config.fullscreenCount) {
        this.firstTime = null;
        this.fullscreenCount = 0;
        Pen.toggleFullscreen();
      }
    }
  }
  computedStyle() {
    return {
      backgroundColor: this.props.originalColor
    };
  }
  computedStyleName() {
    return `pen${(this.props.originalColor === this.props.color ? ' pen-active' : '')}`;
  }
  render() {
    return (
      <div styleName={this.computedStyleName()}>
        <div
          style={this.computedStyle()}
          styleName="color"
          onMouseDown={this.changeColor} />
      </div>
    );
  }
}

Pen.displayName = 'Pen';
Pen.propTypes = {
  originalColor: PropTypes.string.isRequired
};

export default allInOne(Pen, styles, props, actions, {
  allowMultiple: true
});
