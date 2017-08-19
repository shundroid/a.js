import React from 'react';
import LineWidth from '@components/palette/LineWidth';
import Pen from '@components/palette/Pen';
import PlayButton from '@components/palette/PlayButton';
import EditingContainer from '@components/palette/EditingContainer';
import PlayingContainer from '@components/palette/PlayingContainer';
import styles from '@components/palette/palette.cssmodule.styl';
import colors from '@utils/colors';
import allInOne from '@utils/allInOne';

class Palette extends React.Component {
  render() {
    return (
      <div styleName="palette">
        {
          colors.map((color, index) =>
            <Pen
              key={index}
              originalColor={color} />
          )
        }
        <LineWidth />
        <PlayButton />
        <div styleName="container-base">
          <EditingContainer />
          <PlayingContainer />
        </div>
      </div>
    );
  }
}

Palette.displayName = 'Palette';
Palette.propTypes = {};
Palette.defaultProps = {};

export default allInOne(Palette, styles);
