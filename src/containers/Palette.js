import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeColor, changeWidth } from '../actions/';
import Main from '../components/Palette';

class Palette extends Component {
  render() {
    return <Main actions={this.props.actions} palette={this.props.palette} />;
  }
}

Palette.propTypes = {
  actions: PropTypes.shape({
    changeColor: PropTypes.func.isRequired,
    changeWidth: PropTypes.func.isRequired
  }),
  palette: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = { palette: state.palette };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    changeColor,
    changeWidth
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(Palette);
