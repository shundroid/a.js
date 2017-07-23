import React from 'react';
import PropTypes from 'prop-types';
import cssmodules from 'react-css-modules';
import styles from './frameitem.cssmodule.styl';

class FrameItem extends React.Component {
  render() {
    return (
      <li styleName="frame-item">{ this.props.index }</li>
    );
  }
}

FrameItem.displayName = 'FrameItem';
FrameItem.propTypes = {
  index: PropTypes.number.isRequired
};
FrameItem.defaultProps = {};

export default cssmodules(FrameItem, styles);
