import React from 'react';
import PropTypes from 'prop-types';
import cssmodules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from '@components/frames/duration.cssmodule.styl';
import mapState from '@utils/mapState';
import mapDispatch from '@utils/mapDispatch';
import config from '@config';

const props = mapState({
  'player.duration': PropTypes.number.isRequired
});
const actions = mapDispatch('updateDuration');

class Duration extends React.Component {
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
      <div styleName="duration">
        <button onClick={this.decrement} disabled={this.isDisabled()}>←</button>
        <button onClick={this.increment}>→</button>
      </div>
    )
  }
}

Duration.propTypes = {
  ...props.toPropTypes(),
  ...actions.toPropTypes()
};

export default connect(props.toConnect(), actions.toConnect())(cssmodules(Duration, styles));