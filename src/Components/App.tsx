import { AxiosResponse } from 'axios';
import React, { Component, useState } from 'react';
import ApiService from '../Services/ApiService';
import Team from '../Types/Team';
import ServiceComponent from './ServiceComponent/ServiceComponent';

interface AppState {
  TeamName: string;
}

export default class App extends ServiceComponent<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      TeamName: ''
    };
  }

  public CreateNewTeam = () => {
    this.WebService.PostTeam(this.state.TeamName).then((response: AxiosResponse<Team>) => {
      window.location.assign(`http://localhost:3000/team/${this.state.TeamName}`);
    });
  };

  public render = () => (
    <div>
      <h1>Create a team</h1>
      <input
        type='text'
        value={this.state.TeamName}
        onChange={event => this.setState({ TeamName: event.target.value })}
      />
      <button onClick={this.CreateNewTeam}>Create New Team</button>
    </div>
  );
}
