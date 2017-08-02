import { CHANGE_COLOR } from '@actions/const';

function action(parameter) {
  return { type: CHANGE_COLOR, color: parameter };
}

module.exports = action;
