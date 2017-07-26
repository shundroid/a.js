import React from 'react';
import PropTypes from 'prop-types';
import cssmodules from 'react-css-modules';
import styles from './frameitem.cssmodule.styl';

class FrameItem extends React.Component {
  styles() {
    return 'frame-item' + (this.props.currentIndex === this.props.index ? ' active' : '');
  }
  css() {
    return {
      backgroundImage: this.props.thumbnail ? `url(${this.props.thumbnail})` : "none"
    };
  }
  change = () => {
    this.props.onChange(this.props.index);
  }
  remove = event => {
    event.stopPropagation();
    this.props.onRemove(this.props.index);
  }
  render() {
    return (
      <div styleName={this.styles()} onClick={this.change} style={this.css()}>
        <button styleName="remove-button" onClick={this.remove}>×</button>
        { this.props.index }
      </div>
    );
  }
}

FrameItem.displayName = 'FrameItem';
FrameItem.propTypes = {
  index: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  thumbnail: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};
FrameItem.defaultProps = {};

export default cssmodules(FrameItem, styles, {
  allowMultiple: true
});
