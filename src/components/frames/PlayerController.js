import React from 'react';
import PropTypes from 'prop-types';
import cssmodules from 'react-css-modules';
import { connect } from 'react-redux';
import Easing from '@components/frames/Easing';
import styles from '@components/frames/duration.cssmodule.styl';
import mapState from '@utils/mapState';
import mapDispatch from '@utils/mapDispatch';
import config from '@config';

const props = mapState({
  'player.duration': PropTypes.number.isRequired
});
const actions = mapDispatch('updateDuration');

class PlayerController extends React.Component {
  increment = () => {
    this.props.actions.updateDuration(this.props.duration + config.durationStep);
  }
  decrement = () => {
    console.log("AA");
    this.props.actions.updateDuration(this.props.duration - config.durationStep);
  }
  isDisabled() {
    return this.props.duration - config.durationStep <= 0;
  }
  render() {
    return (
      <div styleName="duration">
        <button onClick={this.decrement} disabled={this.isDisabled()}>←</button>
        <Easing />
        <button onClick={this.increment}>→</button>
      </div>
    );
  }
}

PlayerController.propTypes = {
  ...props.toPropTypes(),
  ...actions.toPropTypes()
};

export default connect(props.toConnect(), actions.toConnect())(cssmodules(PlayerController, styles));
