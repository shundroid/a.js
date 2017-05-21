import React from 'react';
import { shallow } from 'enzyme';
import Palette from 'components\Palette.js';

describe('<Palette />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<Palette />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "palette-component"', function () {
      expect(component.hasClass('palette-component')).to.equal(true);
    });
  });
});
