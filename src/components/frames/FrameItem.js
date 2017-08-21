import React from 'react';
import PropTypes from 'prop-types';
import styles from '@components/frames/frameitem.cssmodule.styl';
import { getFrameById } from '@utils/frame';
import allInOne from '@utils/allInOne';

const props = {
  'canvas.currentId': PropTypes.number.isRequired,
  'canvas.frames': PropTypes.array.isRequired,
  'player.isPlaying': PropTypes.bool.isRequired,
  'canvas.width': PropTypes.number.isRequired,
  'canvas.height': PropTypes.number.isRequired
};
const actions = ['changeCurrentFrame', 'removeFrame', 'moveFrame'];

class FrameItem extends React.Component {
  constructor(componentProps) {
    super(componentProps);
    this.state = { originX: 0, clientX: 0 };
  }
  getThumbnail() {
    return getFrameById(this.props.frames, this.props.id).thumbnail;
  }
  getBackgroundImage() {
    if (this.props.currentId === this.props.id) {
      return '-moz-element(#canvas)';
    }
    const thumbnail = this.getThumbnail();
    return thumbnail ? `url(${thumbnail})` : 'none';
  }
  getTransform() {
    return `translateX(${this.state.clientX - this.state.originX}px)`;
  }
  css() {
    return {
      backgroundImage: this.getBackgroundImage(),
      width: `calc(9vh * ${this.props.width / this.props.height})`
    };
  }
  styles() {
    const classes = ['container'];
    if (this.props.currentId === this.props.id) {
      classes.push('active');
    }
    if (this.state.originX !== 0) {
      classes.push('moving');
    }
    return classes.join(' ');
  }
  startMoving = event => {
    let x;
    if (event.touches) {
      x = event.touches[0].clientX;
      window.addEventListener('touchmove', this.move);
      window.addEventListener('touchend', this.finishMoving);
    } else {
      x = event.clientX;
      window.addEventListener('mousemove', this.move);
      window.addEventListener('mouseup', this.finishMoving);
    }
    this.setState({ originX: x, clientX: x });
  }
  move = event => {
    const x = event.touches ? event.touches[0].clientX : event.clientX;
    this.setState({ clientX: x });
  }
  finishMoving = event => {
    if (event.touches) {
      window.removeEventListener('touchmove', this.move);
      window.removeEventListener('touchend', this.finishMoving);
    } else {
      window.removeEventListener('mousemove', this.move);
      window.removeEventListener('mouseup', this.finishMoving);
    }
    const width = this.element.clientWidth;
    const index = this.props.frames.indexOf(getFrameById(this.props.frames, this.props.id));
    const nextIndex = index - Math.round((this.state.originX - this.state.clientX) / width);
    this.props.actions.moveFrame(index, nextIndex);
    this.setState({ originX: 0, clientX: 0 });
  }
  change = () => {
    if (this.props.isPlaying) return;
    this.props.actions.changeCurrentFrame(this.props.id);
  }
  remove = event => {
    if (this.props.isPlaying) return;
    event.stopPropagation();
    this.props.actions.removeFrame(this.props.id);
  }
  render() {
    return (
      <div styleName={this.styles()} style={{ transform: this.getTransform() }}>
        <div
          styleName="thumbnail"
          onClick={this.change}
          style={this.css()}
          draggable="true"
          ref={element => { this.element = element; }}
          onMouseDown={this.startMoving}
          onTouchStart={this.startMoving}>
          <button styleName="remove-button" onClick={this.remove}>×</button>
        </div>
      </div>
    );
  }
}

FrameItem.displayName = 'FrameItem';
FrameItem.propTypes = {
  id: PropTypes.number.isRequired
};
FrameItem.defaultProps = {};

export default allInOne(FrameItem, styles, props, actions, {
  allowMultiple: true
});
