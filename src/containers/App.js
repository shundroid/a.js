/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  addLine,
  changeColor,
  changeWidth,
  clearCanvas,
  undo,
  addFrame,
  changeCurrentFrame,
  removeFrame,
  updateThumbnail
} from '../actions/';
import Main from '../components/App';
/* Populated by react-webpack-redux:reducer */
class App extends Component {
  render() {
    const {actions, palette, canvas, history} = this.props;
    return (
      <Main
        actions={actions}
        palette={palette}
        canvas={canvas}
        history={history}/>
    );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  actions: PropTypes.shape({
    addLine: PropTypes.func.isRequired,
    changeColor: PropTypes.func.isRequired,
    changeWidth: PropTypes.func.isRequired,
    clearCanvas: PropTypes.func.isRequired,
    undo: PropTypes.func.isRequired,
    addFrame: PropTypes.func.isRequired,
    changeCurrentFrame: PropTypes.func.isRequired,
    removeFrame: PropTypes.func.isRequired,
    updateThumbnail: PropTypes.func.isRequired
  }),
  palette: PropTypes.shape({}),
  canvas: PropTypes.shape({}),
  history: PropTypes.shape({})
};
function mapStateToProps(state) {
  // eslint-disable-line no-unused-vars
  /* Populated by react-webpack-redux:reducer */
  const props = {
    palette: state.palette,
    canvas: state.canvas,
    history: state.history
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    addLine,
    changeColor,
    changeWidth,
    clearCanvas,
    undo,
    addFrame,
    changeCurrentFrame,
    removeFrame,
    updateThumbnail
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
