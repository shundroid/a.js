import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import Pen from './Pen';
import styles from './palette.cssmodule.styl';
import colors from '../constants/colors';

class Palette extends React.Component {
  render() {
    const changeColor = this.props.actions.changeColor;
    const currentColor = this.props.palette.color;
    return (
      <div styleName="palette">
        {
          colors.map((color, index) =>
            <Pen
              key={index} color={color}
              onChangeColor={changeColor} currentColor={currentColor} />
          )
        }
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
