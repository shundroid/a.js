import { UPDATE_EASING } from '@actions/const';

export default function action(easing) {
  return { type: UPDATE_EASING, easing };
}
