import React from 'react';
import PropTypes from 'prop-types';
import allInOne from '@utils/allInOne';
import UndoButton from '@components/palette/UndoButton';
import ClearCanvasButton from '@components/palette/ClearCanvasButton';

const props = {
  'player.isPlaying': PropTypes.bool.isRequired
};

class EditingContainer extends React.Component {
  getStyle() {
    return {
      display: this.props.isPlaying ? 'none' : 'flex'
    };
  }
  render() {
    return (
      <div style={this.getStyle()}>
        <UndoButton />
        <ClearCanvasButton />
      </div>
    );
  }
}

export default allInOne(EditingContainer, null, props);
