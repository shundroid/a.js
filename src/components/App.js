import React from 'react';
import PropTypes from 'prop-types';
import Palette from '@containers/Palette';
import Canvas from '@components/Canvas';
import PenPreview from '@components/PenPreview';
import Frames from '@components/Frames';
import { getFrameById } from '@utils/frame';
import '@components/app.css';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <Palette />
        <Canvas />
        <PenPreview lineWidth={this.props.palette.width} color={this.props.palette.color} />
        <Frames
          frames={this.props.canvas.frames}
          currentId={this.props.canvas.currentId}
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
