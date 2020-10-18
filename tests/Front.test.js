import React from 'react';
import { shallow } from 'enzyme';

import Front from '../src/Front';

test('should correctly render Front', () => {
  const component = shallow(<Front />);
  expect(component).toMatchSnapshot();
});
