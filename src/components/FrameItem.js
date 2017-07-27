import React from 'react';
import PropTypes from 'prop-types';
import cssmodules from 'react-css-modules';
import styles from './frameitem.cssmodule.styl';

class FrameItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { originX: 0, clientX: 0 };
  }
  styles() {
    const classes = ['frame-item'];
    if (this.props.currentIndex === this.props.index) {
      classes.push('active');
    }
    if (this.state.originX !== 0) {
      classes.push('moving');
    }
    return classes.join(' ');
  }
  css() {
    return {
      backgroundImage: this.props.thumbnail ? `url(${this.props.thumbnail})` : "none",
      transform: `translateX(${this.state.clientX - this.state.originX}px)`
    };
  }
  startMoving = event => {
    this.setState({ originX: event.clientX, clientX: event.clientX });
    window.addEventListener('mousemove', this.move);
    window.addEventListener('mouseup', this.finishMoving);
  }
  move = event => {
    this.setState({ clientX: event.clientX });
  }
  finishMoving = () => {
    window.removeEventListener('mousemove', this.move);
    window.removeEventListener('mouseup', this.finishMoving);
    const nextIndex = this.props.index - Math.round((this.state.originX - this.state.clientX) / 100);
    this.props.onMove(this.props.index, nextIndex);
    this.setState({ clientX: 0, originX: 0 });
  }
  change = () => {
    this.props.onChange(this.props.index);
  }
  remove = event => {
    event.stopPropagation();
    this.props.onRemove(this.props.index);
  }
  render() {
    return (
      <div styleName={this.styles()} onClick={this.change} style={this.css()} onMouseDown={this.startMoving}>
        <button styleName="remove-button" onClick={this.remove}>×</button>
      </div>
    );
  }
}

FrameItem.displayName = 'FrameItem';
FrameItem.propTypes = {
  index: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  thumbnail: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired
};
FrameItem.defaultProps = {};

export default cssmodules(FrameItem, styles, {
  allowMultiple: true
});
