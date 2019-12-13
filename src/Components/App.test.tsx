import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { AxiosResponse } from 'axios';
import Enzyme, { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import { ReactTestRenderer, create } from 'react-test-renderer';

import App from './App';
import ApiService from '../Services/ApiService';
import Team from '../Types/Team';

type mockedService = jest.Mocked<ApiService>;
type mockedLocation = jest.Mocked<Location>;

const GetGoodMockFunction = (team: Team) => {
  return jest.fn((teamName: string) => {
    const response: AxiosResponse<Team> = {
      status: 200,
      statusText: 'OK',
      data: team,
      headers: [],
      config: {}
    };

    return Promise.resolve(response);
  });
};

const testTeamName = 'test team';

describe('App Tests', () => {
  let mockedWebService: mockedService;
  let app: JSX.Element;
  let wrapper: ShallowWrapper;
  let snapShot: ReactTestRenderer;
  let mockedLocation: Location;
  const { location } = window;

  beforeAll(() => {
    /// do stuff
  });

  beforeEach(() => {
    mockedWebService = new ApiService() as mockedService;
    mockedLocation = window.location as mockedLocation;
    mockedLocation.assign = jest.fn();
    mockedWebService.PostTeam = GetGoodMockFunction(new Team(testTeamName));
    app = <App webService={mockedWebService} location={mockedLocation} />;
    wrapper = shallow(app);
    snapShot = create(app);
  });

  afterEach(() => {
    /// do stuff
  });

  it('renders without crashing', () => {
    expect(wrapper.instance).toBeDefined();
  });

  it('Responds to input', async () => {
    let input = wrapper.find('input');
    input.simulate('change', { target: { value: 'test team' } });

    let button = wrapper.find('button');
    await button.simulate('click');
    expect(mockedLocation.assign).toBeCalled();
  });
});
