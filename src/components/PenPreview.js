import React from 'react';
import PropTypes from 'prop-types';
import cssmodules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from '@components/penpreview.cssmodule.styl';
import config from '@config';
import mapState from '@utils/mapState';

const props = mapState({
  'palette.width': PropTypes.number.isRequired,
  'palette.color': PropTypes.string.isRequired
});

class PenPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShowing: false };
    this.timeoutId = null;
  }
  componentWillUpdate(nextProps) {
    if (nextProps.width !== this.props.width &&
        !this.state.isShowing) {
      this.show();
    }
  }
  computedSize() {
    return this.props.width;
  }
  computedStyleForSvg() {
    return {
      width: `${this.computedSize()}px`,
      height: `${this.computedSize()}px`
    };
  }
  computedStyleForCircle() {
    return {
      fill: this.props.color
    };
  }
  computedStyleName() {
    return `svg${(this.state.isShowing ? ' visible' : '')}`;
  }
  show() {
    this.setState({
      isShowing: true
    });
  }
  hide = () => {
    this.setState({
      isShowing: false
    });
  }
  render() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(this.hide, config.penPreviewTimeout);
    return (
      <svg
        viewBox="0 0 1 1"
        styleName={this.computedStyleName()}
        style={this.computedStyleForSvg()}>

        <circle cx="0.5" cy="0.5" r="0.5" style={this.computedStyleForCircle()} />
      </svg>
    );
  }
}

PenPreview.displayName = 'PenPreview';
PenPreview.propTypes = props.toPropTypes();
PenPreview.defaultProps = {};

export default connect(props.toConnect(), () => ({}))(cssmodules(PenPreview, styles, {
  allowMultiple: true
}));
