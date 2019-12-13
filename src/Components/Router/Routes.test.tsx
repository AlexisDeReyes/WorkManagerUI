import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Enzyme, { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import { ReactTestRenderer, create } from 'react-test-renderer';

import Routes from './Routes';

it('Renders without crashing', () => {
  const router = (
    <MemoryRouter>
      <Routes />
    </MemoryRouter>
  );
  const wrapper = shallow(router);
  const shot = create(router);

  expect(shot.toJSON).toMatchSnapshot();
});

it('Renders team component without crashing', () => {
  const router = (
    <MemoryRouter initialEntries={['/team/test']}>
      <Routes />
    </MemoryRouter>
  );
  const wrapper = shallow(router);
  const shot = create(router);

  expect(shot.toJSON).toMatchSnapshot();
});
