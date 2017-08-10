import React from 'react';
import PropTypes from 'prop-types';
import cssmodules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from '@components/frames/frameitem.cssmodule.styl';
import mapState from '@utils/mapState';
import mapDispatch from '@utils/mapDispatch';
import { getFrameById } from '@utils/frame';

const props = mapState({
  'canvas.currentId': PropTypes.number.isRequired,
  'canvas.frames': PropTypes.array.isRequired,
  'player.isPlaying': PropTypes.bool.isRequired
});
const actions = mapDispatch('changeCurrentFrame', 'removeFrame', 'moveFrame');

class FrameItem extends React.Component {
  getThumbnail() {
    return getFrameById(this.props.frames, this.props.id).thumbnail;
  }
  getBackgroundImage() {
    if (this.props.currentId === this.props.id) {
      return '-moz-element(#canvas)';
    }
    const thumbnail = this.getThumbnail();
    return thumbnail ? `url(${thumbnail})` : 'none';
  }
  styles() {
    const classes = ['frame-item'];
    if (this.props.currentId === this.props.id) {
      classes.push('active');
    }
    return classes.join(' ');
  }
  css() {
    return {
      backgroundImage: this.getBackgroundImage()
    };
  }
  dragStart = event => {
    if (this.props.isPlaying) return;
    event.dataTransfer.setData('id', this.props.id);
  }
  allowDrop = event => {
    event.preventDefault();
  }
  drop = event => {
    event.preventDefault();
    this.props.actions.moveFrame(parseInt(event.dataTransfer.getData('id')), this.props.id);
  }
  change = () => {
    if (this.props.isPlaying) return;
    this.props.actions.changeCurrentFrame(this.props.id);
  }
  remove = event => {
    if (this.props.isPlaying) return;
    event.stopPropagation();
    this.props.actions.removeFrame(this.props.id);
  }
  render() {
    return (
      <div
        styleName={this.styles()}
        onClick={this.change}
        style={this.css()}
        draggable="true"
        onDragStart={this.dragStart}
        onDragOver={this.allowDrop}
        onDrop={this.drop}>
        <button styleName="remove-button" onClick={this.remove}>×</button>
      </div>
    );
  }
}

FrameItem.displayName = 'FrameItem';
FrameItem.propTypes = {
  id: PropTypes.number.isRequired,
  ...props.toPropTypes(),
  ...actions.toPropTypes()
};
FrameItem.defaultProps = {};

export default connect(props.toConnect(), actions.toConnect())(cssmodules(FrameItem, styles, {
  allowMultiple: true
}));
