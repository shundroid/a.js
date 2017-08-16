import React from 'react';
import PropTypes from 'prop-types';
import allInOne from '@utils/allInOne';
import SubmitButton from '@components/palette/SubmitButton';

const props = {
  'player.isPlaying': PropTypes.bool.isRequired
};

class PlayingContainer extends React.Component {
  getStyle() {
    return {
      display: this.props.isPlaying ? 'block' : 'none'
    };
  }
  render() {
    return (
      <div style={this.getStyle()}>
        <SubmitButton />
      </div>
    )
  }
}

export default allInOne(PlayingContainer, null, props);
