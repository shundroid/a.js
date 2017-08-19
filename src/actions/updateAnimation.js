import { UPDATE_ANIMATION } from '@actions/const';

export default function action(animation) {
  return { type: UPDATE_ANIMATION, animation };
}
