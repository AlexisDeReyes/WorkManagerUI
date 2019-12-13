import React, { Component } from 'react';

import TaskColumn from '../TaskColumn/TaskColumn';

import Grid from '@material-ui/core/Grid';

import './Team.scss';

import ApiService from '../../Services/ApiService';
import { Task } from '../../Types/Task';
import TeamType from '../../Types/Team';
import PrioritizedList from '../../Types/PrioritizedList';
import Axios, { AxiosResponse } from 'axios';
import { TeamTaskResponse } from '../../Types/CompoundResources';
import ServiceComponent from '../ServiceComponent/ServiceComponent';

export interface teamProp {
  teamName: string;
}

type gridItemSizeType =
  | boolean
  | 1
  | 'auto'
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | undefined;

export interface teamState {
  newTaskName: string;
  newTaskDescription: string;
  newTaskEffort: number;
  TeamName: string;
  TeamColumns: PrioritizedList[];
  ColumnWidthMd: gridItemSizeType;
  ColumnWidthSm: gridItemSizeType;
  ColumnWidthXs: gridItemSizeType;
}

export default class Team extends ServiceComponent<teamProp, teamState> {
  constructor(props: teamProp) {
    super(props);
    this.state = {
      newTaskName: '',
      newTaskDescription: '',
      newTaskEffort: 1,
      TeamName: props.teamName,
      TeamColumns: [],
      ColumnWidthMd: 12,
      ColumnWidthSm: 12,
      ColumnWidthXs: 12
    };

    this.RefreshTeam();
  }

  public UpdateTeam(team: TeamType) {
    const numberOfColumns = team.taskColumns.length;
    this.setState({
      TeamName: team.name,
      TeamColumns: team.taskColumns,
      ColumnWidthMd: Team.getMdColumnSize(numberOfColumns),
      ColumnWidthSm: Team.getSmColumnSize(numberOfColumns),
      ColumnWidthXs: Team.getXsColumnSize(numberOfColumns)
    });
  }

  public RefreshTeam = (dtoTeam: TeamType | undefined = undefined) => {
    let newTeamState: TeamType;
    if (dtoTeam) {
      newTeamState = TeamType.GetFromApiResponse(dtoTeam);
      this.UpdateTeam(newTeamState);
      return;
    }

    this.WebService.GetTeam(this.props.teamName).then(response => {
      newTeamState = TeamType.GetFromApiResponse(response.data);
      this.UpdateTeam(newTeamState);
    });
  };

  public RefreshNewTask = () => {
    this.setState({
      newTaskName: '',
      newTaskDescription: '',
      newTaskEffort: 1
    });
  };

  public SaveNewTask = () => {
    this.WebService.PostTask(
      this.props.teamName,
      new Task(this.state.newTaskName, this.state.newTaskDescription, this.state.newTaskEffort)
    ).then((response: AxiosResponse<TeamTaskResponse>) => {
      this.RefreshTeam(response.data.Team);
      this.RefreshNewTask();
    });
  };

  public static getGridItemSize = (numberOfColumns: number): number => 12 / numberOfColumns;

  public static getMdColumnSize = (numberOfColumns: number): gridItemSizeType => {
    return Team.getGridItemSize(numberOfColumns) as gridItemSizeType;
  };

  public static getSmColumnSize = (numberOfColumns: number): gridItemSizeType => {
    return Math.min(Team.getGridItemSize(numberOfColumns) * 2, 12) as gridItemSizeType;
  };

  public static getXsColumnSize = (numberOfColumns: number): gridItemSizeType => {
    return Math.min(Team.getGridItemSize(numberOfColumns) * 4, 12) as gridItemSizeType;
  };

  public render = () => {
    return (
      <Grid container className='center'>
        <Grid item xs={12}>
          <h1>{this.state.TeamName}</h1>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <input
              id='taskName'
              type='text'
              value={this.state.newTaskName}
              onChange={event => this.setState({ newTaskName: event.target.value })}></input>
          </Grid>
          <Grid item xs={12}>
            <input
              id='description'
              type='text'
              value={this.state.newTaskDescription}
              onChange={event => this.setState({ newTaskDescription: event.target.value })}></input>
          </Grid>
          <Grid item xs={12}>
            <input
              id='effort'
              type='number'
              value={this.state.newTaskEffort}
              onChange={event => this.setState({ newTaskEffort: +event.target.value })}></input>
          </Grid>
          <Grid item xs={12}>
            <button onClick={this.SaveNewTask}>Save Task</button>
          </Grid>
        </Grid>
        <Grid container>
          <div id='taskColumns'>
            {this.state.TeamColumns.map(tc => (
              <Grid
                item
                key={tc.name}
                md={this.state.ColumnWidthMd}
                sm={this.state.ColumnWidthSm}
                xs={this.state.ColumnWidthXs}>
                <TaskColumn key={tc.name} List={tc} />
              </Grid>
            ))}
          </div>
        </Grid>
      </Grid>
    );
  };
}
