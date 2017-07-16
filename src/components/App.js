import React from 'react';
import PropTypes from 'prop-types';
import Palette from '../containers/Palette';
import Canvas from './Canvas';
import PenPreview from './PenPreview';
import './app.css';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <Palette />
        <Canvas
          color={this.props.palette.color}
          width={this.props.palette.width}
          lines={this.props.canvas.lines}
          onPenUp={this.props.actions.addLine} />
        <PenPreview lineWidth={this.props.palette.width} color={this.props.palette.color} />
      </div>
    );
  }
}

AppComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  palette: PropTypes.object.isRequired,
  canvas: PropTypes.object.isRequired
};

export default AppComponent;
