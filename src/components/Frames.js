import React from 'react';
import PropTypes from 'prop-types';
import cssmodules from 'react-css-modules';
import { connect } from 'react-redux';
import FrameItem from '@components/FrameItem';
import AddFrameButton from '@components/AddFrameButton';
import styles from '@components/frames.cssmodule.styl';
import mapState from '@utils/mapState';
import mapDispatch from '@utils/mapDispatch';

const props = mapState({
  'canvas.frames': PropTypes.array.isRequired,
  'canvas.currentId': PropTypes.number.isRequired
});
const actions = mapDispatch(['addFrame']);

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
  ...props.toPropTypes(),
  ...actions.toPropTypes()
};
Frames.defaultProps = {};

export default connect(props.toConnect(), actions.toConnect())(cssmodules(Frames, styles));
