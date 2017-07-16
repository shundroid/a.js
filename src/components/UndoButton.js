import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './undobutton.cssmodule.styl';

class UndoButton extends React.Component {
  undo = () => {
    this.props.onUndo();
  }
  render() {
    return (
      <button onClick={this.undo}>
        ←
      </button>
    );
  }
}

UndoButton.displayName = 'UndoButton';
UndoButton.propTypes = {
  onUndo: PropTypes.func.isRequired
};
UndoButton.defaultProps = {};

export default cssmodules(UndoButton, styles);
