import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './canvas.cssmodule.styl';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
  }
  componentDidMount() {
    this.updateCanvas();
    window.addEventListener('resize', this.updateCanvas);
    this.ctx = this.canvas.getContext('2d');
    this.positions = [];
    this.isDownPen = false;
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateCanvas);
  }
  getPosition(event) {
    if (event.touches) {
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
    const { x, y } = this.getPosition(event);
    this.pushPosition(x, y);
    this.ctx.strokeStyle = this.props.color;
    this.ctx.lineWidth = this.props.width;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.isDownPen = true;
  }
  penMove = event => {
    if (!this.isDownPen) return;
    const { x, y } = this.getPosition(event);
    this.pushPosition(x, y);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
  penUp = () => {
    this.isDownPen = false;
    // Todo: Dispatch an action
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
        onMouseMove={this.penMove}
        onMouseUp={this.penUp}
        onTouchStart={this.penDown}
        onTouchMove={this.penMove}
        onTouchEnd={this.penUp} />
    );
  }
}

Canvas.displayName = 'Canvas';
Canvas.propTypes = {
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
};
Canvas.defaultProps = {};

export default cssmodules(Canvas, styles);
