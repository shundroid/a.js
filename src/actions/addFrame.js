import { ADD_FRAME } from '@actions/const';

function action(parameter) {
  return { type: ADD_FRAME, parameter };
}

module.exports = action;
