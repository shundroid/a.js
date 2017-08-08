import React from 'react';
import PropTypes from 'prop-types';
import cssmodules from 'react-css-modules';
import { connect } from 'react-redux';
import FrameItem from '@components/frames/FrameItem';
import AddFrameButton from '@components/frames/AddFrameButton';
import styles from '@components/frames/frames.cssmodule.styl';
import mapState from '@utils/mapState';

const props = mapState({
  'canvas.frames': PropTypes.array.isRequired,
});

class Frames extends React.Component {
  render() {
    return (
      <div styleName="frames">
        {
          this.props.frames.map((frame, index) =>
            <FrameItem
              key={index}
              id={frame.id} />
          )
        }
        <AddFrameButton />
      </div>
    );
  }
}

Frames.displayName = 'Frames';
Frames.propTypes = {
  ...props.toPropTypes()
};
Frames.defaultProps = {};

export default connect(props.toConnect(), () => ({}))(cssmodules(Frames, styles));
