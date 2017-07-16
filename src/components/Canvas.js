import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './canvas.cssmodule.styl';

class Canvas extends React.Component {
  static isTouchEvent(event) {
    return !!event.touches;
  }
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
  }
  componentDidMount() {
    this.updateCanvas();
    window.addEventListener('resize', this.updateCanvas);
    this.ctx = this.canvas.getContext('2d');
    this.positions = [];
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateCanvas);
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
  updateCanvas = () => {
    this.setState({
      width: 0,
      height: 0
    });
    this.setState({
      width: this.canvas.clientWidth,
      height: this.canvas.clientHeight
    });
  }
  penDown = event => {
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
    this.ctx.lineWidth = this.props.width;
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
    this.props.onPenUp(this.positions, this.props.color, this.props.width);
    this.positions = [];
  }
  render() {
    return (
      <canvas
        styleName="canvas"
        ref={element => { this.canvas = element; }}
        width={this.state.width}
        height={this.state.height}
        onMouseDown={this.penDown}
        onTouchStart={this.penDown} />
    );
  }
}

Canvas.displayName = 'Canvas';
Canvas.propTypes = {
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  onPenUp: PropTypes.func.isRequired
};
Canvas.defaultProps = {};

export default cssmodules(Canvas, styles);
