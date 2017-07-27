export default class Frame {
  constructor(lines = [], thumbnail = null) {
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
