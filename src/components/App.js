import React from 'react';
import PropTypes from 'prop-types';
import Palette from '../containers/Palette';
import Canvas from './Canvas';
import PenPreview from './PenPreview';
import Frames from './Frames';
import './app.css';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <Palette />
        <Canvas
          color={this.props.palette.color}
          width={this.props.palette.width}
          lines={this.props.canvas.frames[this.props.canvas.currentIndex].lines}
          currentIndex={this.props.canvas.currentIndex}
          onPenUp={this.props.actions.addLine}
          onUpdateThumbnail={this.props.actions.updateThumbnail} />
        <PenPreview lineWidth={this.props.palette.width} color={this.props.palette.color} />
        <Frames
          frames={this.props.canvas.frames}
          currentIndex={this.props.canvas.currentIndex}
          onAddFrame={this.props.actions.addFrame}
          onChangeCurrentFrame={this.props.actions.changeCurrentFrame}
          onRemoveFrame={this.props.actions.removeFrame}
          onMoveFrame={this.props.actions.moveFrame} />
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
