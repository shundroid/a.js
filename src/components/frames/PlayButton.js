import React from 'react';
import PropTypes from 'prop-types';
import styles from '@components/frames/playbutton.cssmodule.styl';
import allInOne from '@utils/allInOne';

const props = {
  'player.isPlaying': PropTypes.bool.isRequired
};
const actions = ['togglePlay'];

class PlayButton extends React.Component {
  getClassName() {
    return `fa fa-${this.props.isPlaying ? 'stop' : 'play'}`;
  }
  render() {
    return (
      <button
        styleName="button"
        onClick={this.props.actions.togglePlay}>
        <i className={this.getClassName()} />
      </button>
    );
  }
}

export default allInOne(PlayButton, styles, props, actions);
