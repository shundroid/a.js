import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './widthpicker.cssmodule.styl';
import config from 'config';

class WidthPicker extends React.Component {
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

WidthPicker.displayName = 'WidthPicker';
WidthPicker.propTypes = {
  width: PropTypes.number.isRequired,
  onChangeWidth: PropTypes.func.isRequired
};
WidthPicker.defaultProps = {};

export default cssmodules(WidthPicker, styles);
