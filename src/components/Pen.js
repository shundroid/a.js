import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './pen.cssmodule.styl';

class Pen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { backgroundColor: '' },
      styleName: ''
    };
  }
  changeColor = () => {
    this.props.onChangeColor(this.props.color);
  }
  updateStates(props = this.props) {
    this.setState({
      style: { backgroundColor: props.color },
      styleName: 'pen' + (props.color === props.currentColor ? ' pen-active' : '')
    });
  }
  componentWillMount() {
    this.updateStates();
  }
  componentWillReceiveProps(nextProps) {
    this.updateStates(nextProps);
  }
  render() {
    return (
      <div style={this.state.style} styleName={this.state.styleName} onMouseDown={this.changeColor} />
    );
  }
}

Pen.displayName = 'Pen';
Pen.propTypes = {
  color: PropTypes.string.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  currentColor: PropTypes.string.isRequired
};

export default cssmodules(Pen, styles, {
  allowMultiple: true
});
