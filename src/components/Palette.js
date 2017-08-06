import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@components/Button';
import LineWidth from '@components/LineWidth';
import Pen from '@components/Pen';
import styles from '@components/palette.cssmodule.styl';
import colors from '@utils/colors';
import { getFrameById } from '@utils/frame';
import mapState from '@utils/mapState';
import mapDispatch from '@utils/mapDispatch';

const props = mapState({
  'canvas.history': PropTypes.array.isRequired,
  'canvas.frames': PropTypes.array.isRequired,
  'canvas.currentId': PropTypes.number.isRequired
});
const actions = mapDispatch(['clearCanvas', 'undo']);

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
          disabled={this.props.history.length === 0}
          onClick={this.props.actions.undo} />
        <Button
          name="clear-canvas"
          disabled={getFrameById(this.props.frames,
            this.props.currentId).length === 0}
          onClick={this.props.actions.clearCanvas} />
      </div>
    );
  }
}

Palette.displayName = 'Palette';
Palette.propTypes = {
  ...props.toPropTypes(),
  ...actions.toPropTypes()
};
Palette.defaultProps = {};

export default connect(props.toConnect(), actions.toConnect())(cssmodules(Palette, styles));
