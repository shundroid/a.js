/* eslint-disable import/newline-after-import */
/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from '../actions/'
*/
/* Populated by react-webpack-redux:action */
import moveFrame from '@actions/moveFrame.js';
import updateThumbnail from '@actions/updateThumbnail.js';
import removeFrame from '@actions/removeFrame.js';
import changeCurrentFrame from '@actions/changeCurrentFrame.js';
import addFrame from '@actions/addFrame.js';
import undo from '@actions/undo.js';
import addLine from '@actions/addLine.js';
import changeWidth from '@actions/changeWidth.js';
import changeColor from '@actions/changeColor.js';
import clearCanvas from '@actions/clearCanvas.js';
const actions = {
  addLine,
  changeColor,
  changeWidth,
  clearCanvas,
  undo,
  addFrame,
  changeCurrentFrame,
  removeFrame,
  updateThumbnail,
  moveFrame
};
module.exports = actions;
