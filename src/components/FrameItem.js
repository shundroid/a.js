import React from 'react';
import PropTypes from 'prop-types';
import cssmodules from 'react-css-modules';
import styles from './frameitem.cssmodule.styl';

class FrameItem extends React.Component {
  styles() {
    return 'frame-item' + (this.props.currentIndex === this.props.index ? ' active' : '');
  }
  onChange = () => {
    this.props.onChange(this.props.index);
  }
  render() {
    return (
      <div styleName={this.styles()} onClick={this.onChange}>
        { this.props.index }
      </div>
    );
  }
}

FrameItem.displayName = 'FrameItem';
FrameItem.propTypes = {
  index: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};
FrameItem.defaultProps = {};

export default cssmodules(FrameItem, styles, {
  allowMultiple: true
});
