import React from 'react';
import cssmodules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from '@components/frames/addframebutton.cssmodule.styl';
import mapDispatch from '@utils/mapDispatch';

const actions = mapDispatch('addFrame');

class AddFrameButton extends React.Component {
  render() {
    return (
      <button
        styleName="button"
        onClick={this.props.actions.addFrame}>add-frame</button>
    );
  }
}

AddFrameButton.displayName = 'AddFrameButton';
AddFrameButton.propTypes = {
  ...actions.toPropTypes()
};
AddFrameButton.defaultProps = {};

export default connect(() => ({}), actions.toConnect())(cssmodules(AddFrameButton, styles));
