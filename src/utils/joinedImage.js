export default class JoinedImage {
  constructor(image, blob, frameCount, width, height) {
    this.image = image;
    this.blob = blob;
    this.frameCount = frameCount;
    this.width = width;
    this.height = height;
  }
  static getEmpty() {
    return new JoinedImage(null, null, 0, 0, 0);
  }
}
