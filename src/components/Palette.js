import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import Pen from './Pen';
import styles from './palette.cssmodule.styl';

class Palette extends React.Component {
  render() {
    const changeColor = this.props.actions.changeColor;
    const currentColor = this.props.palette.color;
    return (
      <div styleName="palette">
        <Pen color="red" onChangeColor={changeColor} currentColor={currentColor} />
        <Pen color="green" onChangeColor={changeColor} currentColor={currentColor} />
      </div>
    );
  }
}

Palette.displayName = 'Palette';
Palette.propTypes = {
  actions: PropTypes.object.isRequired,
  palette: PropTypes.object.isRequired
};
Palette.defaultProps = {};

export default cssmodules(Palette, styles);
