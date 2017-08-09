import { UPDATE_JOINED_IMAGE } from '@actions/const';

export default function action(image) {
  return { type: UPDATE_JOINED_IMAGE, image };
}
