import React from 'react';
import PropTypes from 'prop-types';
import cssmodules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from '@components/frames/playbutton.cssmodule.styl';
import mapState from '@utils/mapState';
import mapDispatch from '@utils/mapDispatch';

const props = mapState({
  'playing.isPlaying': PropTypes.bool.isRequired
});
const actions = mapDispatch('togglePlay');

class PlayButton extends React.Component {
  caption() {
    return this.props.isPlaying ? 'stop' : 'play';
  }
  render() {
    return (
      <button
        styleName="button"
        onClick={this.props.actions.togglePlay}>
        { this.caption() }
      </button>
    );
  }
}

PlayButton.propTypes = {
  ...props.toPropTypes(),
  ...actions.toPropTypes()
};

export default connect(props.toConnect(), actions.toConnect())(cssmodules(PlayButton, styles));
