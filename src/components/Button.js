import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './button.cssmodule.styl';

class Button extends React.Component {
  getStyleName() {
    return `button ${this.props.name}`;
  }
  render() {
    return (
      <button
        styleName={this.getStyleName()}
        disabled={this.props.disabled}
        onClick={this.props.onClick}>{this.props.name}</button>
    );
  }
}

Button.displayName = 'Button';
Button.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
Button.defaultProps = {};

export default cssmodules(Button, styles, { allowMultiple: true });
