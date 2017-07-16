import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeColor, changeWidth, clearCanvas, undo } from '../actions/';
import Main from '../components/Palette';

class Palette extends Component {
  render() {
    return <Main actions={this.props.actions}
                 canvas={this.props.canvas} palette={this.props.palette} />;
  }
}

Palette.propTypes = {
  actions: PropTypes.shape({
    changeColor: PropTypes.func.isRequired,
    changeWidth: PropTypes.func.isRequired,
    clearCanvas: PropTypes.func.isRequired,
    undo: PropTypes.func.isRequired
  }),
  canvas: PropTypes.object.isRequired,
  palette: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { canvas: state.canvas, palette: state.palette };
}

function mapDispatchToProps(dispatch) {
  const actions = { changeColor, changeWidth, clearCanvas, undo };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Palette);
