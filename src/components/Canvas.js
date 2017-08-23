import React from 'react';
import PropTypes from 'prop-types';
import styles from '@components/canvas.cssmodule.styl';
import { getFrameById } from '@utils/frame';
import allInOne from '@utils/allInOne';

// 'currentId' prop is used as prevProp,
// but eslint gives the error.
// eslint-disable react/no-unused-prop-types

const props = {
  'palette.color': PropTypes.string.isRequired,
  'palette.lineWidth': PropTypes.number.isRequired,
  'canvas.frames': PropTypes.array.isRequired,
  'canvas.currentId': PropTypes.number.isRequired,
  'canvas.history': PropTypes.array.isRequired,
  'canvas.isUpdateThumbnailNeeded': PropTypes.bool.isRequired,
  'canvas.width': PropTypes.number.isRequired,
  'canvas.height': PropTypes.number.isRequired,
  'player.isPlaying': PropTypes.bool.isRequired
};
const actions = ['addLine', 'updateThumbnail', 'changeSize'];

class Canvas extends React.Component {
  static isTouchEvent(event) {
    return !!event.touches;
  }
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.positions = [];
    window.addEventListener('resize', this.updateCanvasSize);
    this.updateCanvasSize();
  }
  componentDidUpdate(prevProps) {
    if (this.props.isUpdateThumbnailNeeded) {
      this.props.actions.updateThumbnail(prevProps.currentId, this.canvas.toDataURL('image/png'));
    }
    if (this.props.history.length < prevProps.history.length ||
        this.getLines() < getFrameById(prevProps.frames, prevProps.currentId).lines ||
        this.props.currentId !== prevProps.currentId) {
      this.updateCanvas();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateCanvasSize);
  }
  getStyle() {
    return {
      display: this.props.isPlaying ? 'none' : 'block'
    };
  }
  getLines() {
    return getFrameById(this.props.frames, this.props.currentId).lines;
  }
  getPosition(event) {
    if (Canvas.isTouchEvent(event)) {
      return {
        x: event.touches[0].clientX - this.canvas.offsetLeft,
        y: event.touches[0].clientY - this.canvas.offsetTop
      };
    }
    return {
      x: event.clientX - this.canvas.offsetLeft,
      y: event.clientY - this.canvas.offsetTop
    };
  }
  pushPosition(x, y) {
    this.positions.push({ x, y });
  }
  updateCanvas() {
    this.ctx.clearRect(0, 0, this.props.width, this.props.height);
    for (const line of this.getLines()) {
      this.ctx.strokeStyle = line.color;
      this.ctx.lineWidth = line.lineWidth;
      this.ctx.beginPath();
      if (line.position.length === 1) {
        const { x, y } = line.position[0];
        this.ctx.arc(x, y, 0.8, 0, 360);
      } else {
        for (const index in line.position) {
          const { x, y } = line.position[index];
          if (index === 0) {
            this.ctx.moveTo(x, y);
          } else {
            this.ctx.lineTo(x, y);
          }
        }
      }
      this.ctx.stroke();
    }
  }
  updateCanvasSize = () => {
    this.props.actions.changeSize(0, 0);
    this.props.actions.changeSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.updateCanvas();
  }
  penDown = event => {
    if (this.props.isPlaying) return;
    if (Canvas.isTouchEvent(event)) {
      this.canvas.addEventListener('touchmove', this.penMove);
      this.canvas.addEventListener('touchend', this.penUp);
      window.addEventListener('touchend', this.penUp);
    } else {
      this.canvas.addEventListener('mousemove', this.penMove);
      this.canvas.addEventListener('mouseup', this.penUp);
      window.addEventListener('mouseup', this.penUp);
    }
    const { x, y } = this.getPosition(event);
    this.pushPosition(x, y);
    this.ctx.strokeStyle = this.props.color;
    this.ctx.lineWidth = this.props.lineWidth;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    this.ctx.beginPath();
    this.ctx.arc(x, y, 0.8, 0, 360);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }
  penMove = event => {
    const { x, y } = this.getPosition(event);
    this.pushPosition(x, y);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }
  penUp = event => {
    if (Canvas.isTouchEvent(event)) {
      this.canvas.removeEventListener('touchmove', this.penMove);
      this.canvas.removeEventListener('touchend', this.penUp);
      window.removeEventListener('touchend', this.penUp);
    } else {
      this.canvas.removeEventListener('mousemove', this.penMove);
      this.canvas.removeEventListener('mouseup', this.penUp);
      window.removeEventListener('mouseup', this.penUp);
    }
    // Todo: Dispatch an action
    this.isDownPen = false;
    this.props.actions.addLine(this.positions, this.props.color, this.props.lineWidth);
    this.positions = [];
  }
  render() {
    return (
      <canvas
        id="canvas"
        styleName="canvas"
        ref={element => { this.canvas = element; }}
        width={this.props.width}
        height={this.props.height}
        style={this.getStyle()}
        onMouseDown={this.penDown}
        onTouchStart={this.penDown} />
    );
  }
}

Canvas.displayName = 'Canvas';
Canvas.defaultProps = {};

export default allInOne(Canvas, styles, props, actions);
