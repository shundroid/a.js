import { CHANGE_SIZE } from '@actions/const';

export default function action(width, height) {
  return { type: CHANGE_SIZE, width, height };
}
