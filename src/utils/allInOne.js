import { connect } from 'react-redux';
import cssmodules from 'react-css-modules';
import mapState from '@utils/mapState';
import mapDispatch from '@utils/mapDispatch';

export default function allInOne(_component, style = null, _props = {}, _actions = [], styleOptions = {}) {
  const props = mapState(_props);
  const actions = mapDispatch(..._actions);
  _component.propTypes = { ..._component.propTypes, ...props.toPropTypes(), ...actions.toPropTypes() };
  const component = style ? cssmodules(_component, style, styleOptions) : _component;
  return connect(props.toConnect(), actions.toConnect())(component);
}
