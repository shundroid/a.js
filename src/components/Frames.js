import React from 'react';
import PropTypes from 'prop-types';
import cssmodules from 'react-css-modules';
import FrameItem from './FrameItem'
import styles from './frames.cssmodule.styl';

class Frames extends React.Component {
  render() {
    return (
      <ul styleName="frames">
        {
          this.props.frames.map((frame, index) =>
            <FrameItem
              key={index}
              index={index} />
          )
        }
      </ul>
    );
  }
}

Frames.displayName = 'Frames';
Frames.propTypes = {
  frames: PropTypes.array.isRequired
};
Frames.defaultProps = {};

export default cssmodules(Frames, styles);
