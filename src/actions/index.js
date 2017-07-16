/* eslint-disable import/newline-after-import */
/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from '../actions/'
*/
/* Populated by react-webpack-redux:action */
import undo from '../actions/undo.js';
import addLine from '../actions/addLine.js';
import changeWidth from '../actions/changeWidth.js';
import changeColor from '../actions/changeColor.js';
const actions = {
  changeColor,
  changeWidth,
  addLine,
  undo
};
module.exports = actions;
