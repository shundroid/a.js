import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './linewidth.cssmodule.styl';
import config from 'config';

class LineWidth extends React.Component {
  changeWidth = () => {}
  finishedChangeWidth = event => {
    this.props.onChangeWidth(parseInt(event.target.value));
  }
  render() {
    return (
      <div>
        <input
          type="range" styleName="slider" min="1" max={config.maxWidth}
          defaultValue={this.props.width}
          onChange={this.changeWidth} onMouseUp={this.finishedChangeWidth} />
      </div>
    );
  }
}

LineWidth.displayName = 'LineWidth';
LineWidth.propTypes = {
  width: PropTypes.number.isRequired,
  onChangeWidth: PropTypes.func.isRequired
};
LineWidth.defaultProps = {};

export default cssmodules(LineWidth, styles);
