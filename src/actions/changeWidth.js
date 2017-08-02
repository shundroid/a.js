import { CHANGE_WIDTH } from '@actions/const';

function action(parameter) {
  return { type: CHANGE_WIDTH, width: parameter };
}

module.exports = action;
