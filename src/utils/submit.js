import config from '@config';

export default function submit(joinedImage, duration) {
  const formData = new FormData();
  formData.append('space', config.aspaceSpaceName);
  formData.append('canvas_width', joinedImage.width);
  formData.append('canvas_height', joinedImage.height);
  formData.append('frame_count', joinedImage.frameCount);
  formData.append('animation_duration', duration);
  formData.append('animation_easing', 'linear');
  formData.append('image', joinedImage.blob);
  const request = new XMLHttpRequest();
  request.open('POST', config.aspaceUrl, true);
  request.onreadystatechange = () => {
    if (request.readyState !== 4) {
      return;
    }
    if (request.status !== 200) {
      console.error(request.responseText);
      alert('error: please see console');
      return;
    }
    alert('success!');
  };
  request.send(formData);
}
