import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './pen.cssmodule.styl';

class Pen extends React.Component {
  changeColor = () => {
    this.props.onChangeColor({ color: this.props.color });
  }
  render() {
    const style = {
      backgroundColor: this.props.color,
    };
    if (this.props.color === this.props.currentColor) {
      style.margin = '0';
      style.border = '1px solid black';
    }
    return (
      <div style={style} styleName="pen" onMouseDown={this.changeColor} />
    );
  }
}

Pen.displayName = 'Pen';
Pen.propTypes = {
  color: PropTypes.string,
  onChangeColor: PropTypes.func.isRequired,
  currentColor: PropTypes.string.isRequired
};
Pen.defaultProps = {
  color: 'red'
};

export default cssmodules(Pen, styles);
