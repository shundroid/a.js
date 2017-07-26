import React from 'react';
import PropTypes from 'prop-types';
import cssmodules from 'react-css-modules';
import FrameItem from './FrameItem'
import Button from './Button';
import styles from './frames.cssmodule.styl';

class Frames extends React.Component {
  render() {
    return (
      <div styleName="frames">
        {
          this.props.frames.map((frame, index) =>
            <FrameItem
              key={index}
              index={index}
              currentIndex={this.props.currentIndex}
              thumbnail={this.props.thumbnails[index]}
              onChange={this.props.onChangeCurrentFrame}
              onRemove={this.props.onRemoveFrame} />
          )
        }
        <Button
          name="add-frame"
          onClick={this.props.onAddFrame} />
      </div>
    );
  }
}

Frames.displayName = 'Frames';
Frames.propTypes = {
  frames: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  thumbnails: PropTypes.object.isRequired,
  onAddFrame: PropTypes.func.isRequired,
  onChangeCurrentFrame: PropTypes.func.isRequired,
  onRemoveFrame: PropTypes.func.isRequired
};
Frames.defaultProps = {};

export default cssmodules(Frames, styles);
