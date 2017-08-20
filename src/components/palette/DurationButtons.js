import React from 'react';
import PropTypes from 'prop-types';
import PaletteButton from '@components/palette/PaletteButton';
import config from '@config';
import allInOne from '@utils/allInOne';

const props = {
  'player.duration': PropTypes.number.isRequired
};
const actions = ['updateDuration'];

class DurationButtons extends React.Component {
  increment = () => {
    this.props.actions.updateDuration(this.props.duration + config.durationStep);
  }
  decrement = () => {
    this.props.actions.updateDuration(this.props.duration - config.durationStep);
  }
  isDisabled() {
    return this.props.duration - config.durationStep <= 0;
  }
  render() {
    return (
      <div>
        <PaletteButton
          icon="fa-backward"
          onClick={this.increment} />
        <PaletteButton
          icon="fa-forward"
          onClick={this.decrement}
          disabled={this.isDisabled()} />
      </div>
    );
  }
}

export default allInOne(DurationButtons, null, props, actions);
