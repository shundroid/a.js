import React from 'react';
import PropTypes from 'prop-types';
import Palette from '@components/Palette';
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
        <PenPreview />
        <Frames />
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
