export default class Frame {
  constructor(lines = [], thumbnail = null, id = Date.now()) {
    this.id = id;
    this.lines = lines;
    this.thumbnail = thumbnail;
  }
  appendLine(line) {
    this.lines.push(line);
  }
  updateThumbnail(thumbnail) {
    this.thumbnail = thumbnail;
  }
  clear() {
    this.lines = [];
  }
}

export function getFrameById(frames, id) {
  for (const frame of frames) {
    if (frame.id === id) {
      return frame;
    }
  }
  return null;
}
