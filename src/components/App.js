import React from 'react';
import { connect } from 'react-redux';
import Palette from '@components/palette/Palette';
import PrevCanvas from '@components/PrevCanvas';
import Canvas from '@components/Canvas';
import PenPreview from '@components/PenPreview';
import Frames from '@components/frames/Frames';
import Player from '@components/Player';
import '@components/app.css';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <Palette />
        <PrevCanvas />
        <Canvas />
        <Player />
        <PenPreview />
        <Frames />
      </div>
    );
  }
}

AppComponent.propTypes = {};

export default connect(() => ({}), () => ({}))(AppComponent);
