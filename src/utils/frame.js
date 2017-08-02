export default class Frame {
  constructor(lines = [], thumbnail = null, originalId = Date.now()) {
    this.originalId = originalId;
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
  for (let frame of frames) {
    if (frame.originalId === id) {
      return frame;
    }
  }
  return null;
}
