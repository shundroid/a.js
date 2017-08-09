import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '@components/frames/addframebutton.cssmodule.styl';
import mapState from '@utils/mapState';
import mapDispatch from '@utils/mapDispatch';

const props = mapState({
  'playing.isPlaying': PropTypes.bool.isRequired
});
const actions = mapDispatch('addFrame');

class AddFrameButton extends React.Component {
  isDisabled() {
    return this.props.isPlaying;
  }
  render() {
    return (
      <button
        styleName="button"
        disabled={this.isDisabled()}
        onClick={this.props.actions.addFrame}>add-frame</button>
    );
  }
}

AddFrameButton.displayName = 'AddFrameButton';
AddFrameButton.propTypes = {
  ...props.toPropTypes(),
  ...actions.toPropTypes()
};
AddFrameButton.defaultProps = {};

export default connect(props.toConnect(), actions.toConnect())(cssmodules(AddFrameButton, styles));
