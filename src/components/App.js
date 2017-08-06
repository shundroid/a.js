import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

AppComponent.propTypes = {};

export default connect(() => ({}), () => ({}))(AppComponent);
