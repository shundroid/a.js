import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PaletteButton from '@components/palette/PaletteButton';
import mapState from '@utils/mapState';
import submit from '@utils/submit';

const props = mapState({
  'player.duration': PropTypes.number.isRequired,
  'player.joinedImage': PropTypes.object.isRequired,
  'player.easing': PropTypes.string.isRequired,
});

class SubmitButton extends React.Component {
  onClick() {
    submit(this.props.joinedImage, this.props.duration, this.props.easing);
  }
  isDisabled() {
    return !this.props.joinedImage.blob;
  }
  render() {
    return (
      <PaletteButton
        caption="submit"
        disabled={this.isDisabled()}
        onClick={() => this.onClick()} />
    );
  }
}

SubmitButton.displayName = 'SubmitButton';
SubmitButton.propTypes = {
  ...props.toPropTypes(),
};

export default connect(props.toConnect(), () => ({}))(SubmitButton);
