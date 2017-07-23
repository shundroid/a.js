import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import Button from './Button';
import LineWidth from './LineWidth';
import Pen from './Pen';
import UndoButton from './UndoButton';
import styles from './palette.cssmodule.styl';
import colors from '../constants/colors';

class Palette extends React.Component {
  render() {
    return (
      <div styleName="palette">
        {
          colors.map((color, index) =>
            <Pen
              key={index}
              color={color}
              onChangeColor={this.props.actions.changeColor}
              currentColor={this.props.palette.color} />
          )
        }
      <LineWidth
          width={this.props.palette.width}
          onChangeWidth={this.props.actions.changeWidth} />
        <UndoButton onUndo={this.props.actions.undo} />
        <Button
          name="clear-canvas"
          disabled={this.props.canvas.frames[this.props.canvas.currentIndex].length == 0}
          onClick={this.props.actions.clearCanvas} />
      </div>
    );
  }
}

Palette.displayName = 'Palette';
Palette.propTypes = {
  actions: PropTypes.object.isRequired,
  canvas: PropTypes.object.isRequired,
  palette: PropTypes.object.isRequired
};
Palette.defaultProps = {};

export default cssmodules(Palette, styles);
