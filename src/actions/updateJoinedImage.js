import { UPDATE_JOINED_IMAGE } from '@actions/const';

function action(image) {
  return { type: UPDATE_JOINED_IMAGE, image };
}

module.exports = action;
