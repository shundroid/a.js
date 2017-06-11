import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './pen.cssmodule.styl';

class Pen extends React.Component {
  changeColor = () => {
    this.props.onChangeColor(this.props.color);
  }
  computedStyle() {
    return {
      backgroundColor: this.props.color
    };
  }
  computedStyleName() {
    return `pen${(this.props.color === this.props.currentColor ? ' pen-active' : '')}`;
  }
  render() {
    return (
      <div
        style={this.computedStyle()}
        styleName={this.computedStyleName()}
        onMouseDown={this.changeColor} />
    );
  }
}

Pen.displayName = 'Pen';
Pen.propTypes = {
  color: PropTypes.string.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  currentColor: PropTypes.string.isRequired
};

export default cssmodules(Pen, styles, {
  allowMultiple: true
});
