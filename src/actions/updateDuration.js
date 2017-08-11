import { UPDATE_DURATION } from '@actions/const';

export default function action(duration) {
  return { type: UPDATE_DURATION, duration };
}
