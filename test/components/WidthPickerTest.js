import React from 'react';
import { shallow } from 'enzyme';
import WidthPicker from 'components\WidthPicker.js';

describe('<WidthPicker />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<WidthPicker />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "widthpicker-component"', function () {
      expect(component.hasClass('widthpicker-component')).to.equal(true);
    });
  });
});
