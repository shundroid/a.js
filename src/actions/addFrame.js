import { ADD_FRAME } from './const';

function action(parameter) {
  return { type: ADD_FRAME, parameter };
}

module.exports = action;
