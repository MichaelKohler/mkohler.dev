import React from 'react';
import { shallow } from 'enzyme';

import Header from '../src/Header';

test('should correctly render Header', () => {
  const component = shallow(<Header />);
  expect(component).toMatchSnapshot();
});
