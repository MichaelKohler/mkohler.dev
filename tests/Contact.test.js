import React from 'react';
import { shallow } from 'enzyme';

import Contact from '../src/Contact';

test('should correctly render Contact', () => {
  const component = shallow(<Contact />);
  expect(component).toMatchSnapshot();
});
