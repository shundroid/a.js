import React from 'react';
import PropTypes from 'prop-types';
import cssmodules from 'react-css-modules';
import FrameItem from '@components/FrameItem';
import Button from '@components/Button';
import styles from '@components/frames.cssmodule.styl';

class Frames extends React.Component {
  render() {
    return (
      <div styleName="frames">
        {
          this.props.frames.map((frame, index) =>
            <FrameItem
              key={index}
              id={frame.id}
              currentId={this.props.currentId}
              thumbnail={frame.thumbnail}
              onChange={this.props.onChangeCurrentFrame}
              onRemove={this.props.onRemoveFrame}
              onMove={this.props.onMoveFrame} />
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
  currentId: PropTypes.number.isRequired,
  onAddFrame: PropTypes.func.isRequired,
  onChangeCurrentFrame: PropTypes.func.isRequired,
  onRemoveFrame: PropTypes.func.isRequired,
  onMoveFrame: PropTypes.func.isRequired
};
Frames.defaultProps = {};

export default cssmodules(Frames, styles);
