import React from 'react';
import Canvas from './Canvas';
import './app.css';

class AppComponent extends React.Component {

  render() {
    return (
      <div className="index">
        <Canvas />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
