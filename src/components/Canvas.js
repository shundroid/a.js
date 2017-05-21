import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './canvas.cssmodule.styl';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
  }
  componentDidMount() {
    this.updateCanvas();
    window.addEventListener('resize', this.updateCanvas);
  }
  componentWillUnmount() {
    window.addEventListener('resize', this.updateCanvas);
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
  render() {
    return (
      <canvas
        styleName="canvas"
        ref={element => { this.canvas = element; }}
        width={this.state.width}
        height={this.state.height} />
    );
  }
}

Canvas.displayName = 'Canvas';
Canvas.propTypes = {};
Canvas.defaultProps = {};

export default cssmodules(Canvas, styles);
