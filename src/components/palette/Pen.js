import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '@components/palette/pen.cssmodule.styl';
import mapState from '@utils/mapState';
import mapDispatch from '@utils/mapDispatch';

const props = mapState({
  'palette.color': PropTypes.string.isRequired
});
const actions = mapDispatch('changeColor');

class Pen extends React.Component {
  changeColor = () => {
    this.props.actions.changeColor(this.props.originalColor);
  }
  computedStyle() {
    return {
      backgroundColor: this.props.originalColor
    };
  }
  computedStyleName() {
    return `pen${(this.props.originalColor === this.props.color ? ' pen-active' : '')}`;
  }
  render() {
    return (
      <div
        style={this.computedStyle()}
        styleName={this.computedStyleName()}
        onMouseDown={this.changeColor} />
    );
  }
}

Pen.displayName = 'Pen';
Pen.propTypes = {
  originalColor: PropTypes.string.isRequired,
  ...props.toPropTypes(),
  ...actions.toPropTypes()
};

export default connect(props.toConnect(), actions.toConnect())(cssmodules(Pen, styles, {
  allowMultiple: true
}));
