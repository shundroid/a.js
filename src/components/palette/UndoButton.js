import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PaletteButton from '@components/palette/PaletteButton';
import mapState from '@utils/mapState';
import mapDispatch from '@utils/mapDispatch';

const props = mapState({
  'canvas.history': PropTypes.array.isRequired,
  'player.isPlaying': PropTypes.bool.isRequired
});
const actions = mapDispatch(['undo']);

class UndoButton extends React.Component {
  isDisabled() {
    return this.props.history.length === 0 || this.props.isPlaying;
  }
  render() {
    return (
      <PaletteButton
        caption="undo"
        disabled={this.isDisabled()}
        onClick={this.props.actions.undo} />
    );
  }
}
UndoButton.displayName = 'UndoButton';
UndoButton.propTypes = {
  ...props.toPropTypes(),
  ...actions.toPropTypes()
};

export default connect(props.toConnect(), actions.toConnect())(UndoButton);
