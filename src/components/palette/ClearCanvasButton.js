import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PaletteButton from '@components/palette/PaletteButton';
import mapState from '@utils/mapState';
import mapDispatch from '@utils/mapDispatch';
import { getFrameById } from '@utils/frame';

const props = mapState({
  'canvas.frames': PropTypes.array.isRequired,
  'canvas.currentId': PropTypes.number.isRequired,
  'player.isPlaying': PropTypes.bool.isRequired
});
const actions = mapDispatch('clearCanvas');

class ClearCanvasButton extends Component {
  isDisabled() {
    return this.props.isPlaying ||
      getFrameById(this.props.frames, this.props.currentId).lines.length === 0;
  }
  render() {
    return (
      <PaletteButton
        caption="clear-canvas"
        disabled={this.isDisabled()}
        onClick={this.props.actions.clearCanvas} />
    );
  }
}
ClearCanvasButton.displayName = 'ClearCanvasButton';
ClearCanvasButton.propTypes = {
  ...props.toPropTypes(),
  ...actions.toPropTypes()
};

export default connect(props.toConnect(), actions.toConnect())(ClearCanvasButton);
