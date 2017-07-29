import React from 'react';
import { shallow } from 'enzyme';
import Frames from 'components\Frames.js';

describe('<Frames />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<Frames />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "frames-component"', function () {
      expect(component.hasClass('frames-component')).to.equal(true);
    });
  });
});
