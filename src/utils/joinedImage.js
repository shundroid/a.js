export default class JoinedImage {
  constructor(image, frameCount, width, height) {
    this.image = image;
    this.frameCount = frameCount;
    this.width = width;
    this.height = height;
  }
  static getEmpty() {
    return new JoinedImage(null, 0, 0, 0);
  }
}