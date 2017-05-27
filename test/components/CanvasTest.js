import React from 'react';
import { shallow } from 'enzyme';
import Canvas from 'components/Canvas.js';

describe('<Canvas />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<Canvas />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "canvas-component"', function () {
      expect(component.hasClass('canvas-component')).to.equal(true);
    });
  });
});
