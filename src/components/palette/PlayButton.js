import React from 'react';
import PropTypes from 'prop-types';
import PaletteButton from '@components/palette/PaletteButton';
import allInOne from '@utils/allInOne';

const props = {
  'player.isPlaying': PropTypes.bool.isRequired
};
const actions = ['togglePlay'];

class PlayButton extends React.Component {
  onClick = () => {
    this.props.actions.togglePlay();
  }
  getIcon() {
    return this.props.isPlaying ? 'fa-stop' : 'fa-play';
  }
  render() {
    return (
      <PaletteButton
        icon={this.getIcon()}
        onClick={this.onClick} />
    );
  }
}

export default allInOne(PlayButton, null, props, actions);
