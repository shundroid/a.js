import React from 'react';
import { shallow } from 'enzyme';
import LineWidth from '@components/LineWidth.js';

describe('<LineWidth />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<LineWidth />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "linewidth-component"', function () {
      expect(component.hasClass('linewidth-component')).to.equal(true);
    });
  });
});
