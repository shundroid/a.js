import React from 'react';
import PropTypes from 'prop-types';
import Palette from './Palette';
import Canvas from './Canvas';
import './app.css';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <Palette actions={this.props.actions} palette={this.props.palette} />
        <Canvas color={this.props.palette.color} width={this.props.palette.width} />
      </div>
    );
  }
}

AppComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  palette: PropTypes.object.isRequired
};

export default AppComponent;
