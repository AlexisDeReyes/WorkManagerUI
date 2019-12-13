import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid';
import { AxiosResponse } from 'axios';
import { resolve } from 'url';

import ServiceComponent from './ServiceComponent';
import ApiService from '../../Services/ApiService';
import Team from '../../Types/Team';

type mockedService = jest.Mocked<ApiService>;

const GetMockFunction = () => {
  return jest.fn((team: string) => {
    const response: AxiosResponse<Team> = {
      status: 200,
      statusText: 'OK',
      data: new Team(team),
      headers: [],
      config: {}
    };

    return Promise.resolve(response);
  });
};

it('Creates a new ServiceComponent', () => {
  const component = new ServiceComponent();
  expect(component.WebService).toBeDefined;
  expect(component.WebService).not.toEqual({});
});

it('Creates Component with Mocked Service', () => {
  const mockedWebService = new ApiService() as mockedService;

  mockedWebService.PostTeam = GetMockFunction();

  const component = new ServiceComponent({ webService: mockedWebService });

  expect(jest.isMockFunction(component.WebService.PostTeam)).toEqual(true);
});

it('Creates Component with Mocked Service', () => {
  let mockedWebService = new ApiService() as mockedService;
  mockedWebService.PostTeam = jest.fn((team: string) => {
    const response: AxiosResponse<Team> = {
      status: 200,
      statusText: 'WOW',
      data: new Team(team),
      headers: [],
      config: {}
    };

    return Promise.resolve(response);
  });

  const component = new ServiceComponent({ webService: mockedWebService });

  expect(component.WebService.PostTeam(uuid())).resolves.toHaveProperty('statusText', 'WOW');
  expect(component.WebService.GetTeam(uuid())).rejects;
});
