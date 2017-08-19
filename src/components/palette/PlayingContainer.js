import React from 'react';
import PropTypes from 'prop-types';
import allInOne from '@utils/allInOne';
import DurationButtons from '@components/palette/DurationButtons';
import SubmitButton from '@components/palette/SubmitButton';
import EasingButton from '@components/palette/EasingButton';

const props = {
  'player.isPlaying': PropTypes.bool.isRequired
};

class PlayingContainer extends React.Component {
  getStyle() {
    return {
      display: this.props.isPlaying ? 'flex' : 'none'
    };
  }
  render() {
    return (
      <div style={this.getStyle()}>
        <DurationButtons />
        <EasingButton />
        <SubmitButton />
      </div>
    );
  }
}

export default allInOne(PlayingContainer, null, props);
