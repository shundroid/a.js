import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '@components/palette/linewidth.cssmodule.styl';
import config from '@config';
import mapState from '@utils/mapState';
import mapDispatch from '@utils/mapDispatch';

const props = mapState({
  'palette.width': PropTypes.number.isRequired
});
const actions = mapDispatch('changeWidth');

class LineWidth extends React.Component {
  changeWidth = event => {
    this.props.actions.changeWidth(parseInt(event.target.value));
  }
  render() {
    return (
      <div>
        <input
          type="range" styleName="slider" min="1" max={config.maxWidth}
          defaultValue={this.props.width}
          onChange={this.changeWidth} />
      </div>
    );
  }
}

LineWidth.displayName = 'LineWidth';
LineWidth.propTypes = {
  ...props.toPropTypes(),
  ...actions.toPropTypes()
};
LineWidth.defaultProps = {};

export default connect(props.toConnect(), actions.toConnect())(cssmodules(LineWidth, styles));
