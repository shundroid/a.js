import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '@components/palette/linewidth.cssmodule.styl';
import config from '@config';
import mapState from '@utils/mapState';
import mapDispatch from '@utils/mapDispatch';

const props = mapState({
  'palette.lineWidth': PropTypes.number.isRequired
});
const actions = mapDispatch('changeLineWidth');

class LineWidth extends React.Component {
  changeLineWidth = event => {
    this.props.actions.changeLineWidth(parseInt(event.target.value));
  }
  render() {
    return (
      <div>
        <input
          type="range" styleName="slider" min="1" max={config.maxLineWidth}
          defaultValue={this.props.lineWidth}
          onChange={this.changeLineWidth} />
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
