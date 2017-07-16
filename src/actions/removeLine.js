import { REMOVE_LINE } from './const';

function action(index) {
  return { type: REMOVE_LINE, index };
}

module.exports = action;
