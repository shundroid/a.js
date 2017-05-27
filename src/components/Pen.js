import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './pen.cssmodule.styl';

class Pen extends React.Component {
  changeColor = () => {
    this.props.onChangeColor(this.props.color);
  }
  render() {
    const style = {
      backgroundColor: this.props.color,
    };
    const styleNames = ['pen'];
    if (this.props.color === this.props.currentColor) {
      styleNames.push('pen-active');
    }
    return (
      <div style={style} styleName={styleNames.join(' ')} onMouseDown={this.changeColor} />
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
