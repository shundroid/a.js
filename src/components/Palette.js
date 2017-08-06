import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import Button from '@components/Button';
import LineWidth from '@components/LineWidth';
import Pen from '@components/Pen';
import styles from '@components/palette.cssmodule.styl';
import colors from '@utils/colors';
import { getFrameById } from '@utils/frame';

class Palette extends React.Component {
  render() {
    return (
      <div styleName="palette">
        {
          colors.map((color, index) =>
            <Pen
              key={index}
              originalColor={color} />
          )
        }
        <LineWidth />
        <Button
          name="undo"
          disabled={this.props.canvas.history.length === 0}
          onClick={this.props.actions.undo} />
        <Button
          name="clear-canvas"
          disabled={getFrameById(this.props.canvas.frames,
            this.props.canvas.currentId).length === 0}
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
