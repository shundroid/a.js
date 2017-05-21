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
      border: this.props.color === this.props.currentColor ?
        '1px solid black' : 'none'
    };
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
