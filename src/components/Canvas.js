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
    this.beforePosition = {};
  }
  componentWillUnmount() {
    window.addEventListener('resize', this.updateCanvas);
  }
  getPosition(event) {
    return {
      x: event.clientX - this.canvas.offsetLeft,
      y: event.clientY - this.canvas.offsetTop
    };
  }
  setBeforePosition(x, y) {
    this.beforePosition = { x, y };
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
  drawLineTo(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
  mouseDown = event => {
    const pos = this.getPosition(event);
    this.setBeforePosition(pos.x, pos.y);
    this.ctx.strokeStyle = this.props.color;
    this.ctx.lineWidth = this.props.width;
    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
  }
  mouseMove = event => {
    if (event.buttons === 1) {
      const pos = this.getPosition(event);
      this.drawLineTo(pos.x, pos.y);
      this.setBeforePosition(pos.x, pos.y);
    }
  }
  mouseUp = () => {
  }
  render() {
    return (
      <canvas
        styleName="canvas"
        ref={element => { this.canvas = element; }}
        width={this.state.width}
        height={this.state.height}
        onMouseDown={this.mouseDown}
        onMouseMove={this.mouseMove}
        onMouseUp={this.mouseUp} />
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
