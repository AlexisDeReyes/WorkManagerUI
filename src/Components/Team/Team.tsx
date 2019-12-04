import React, { Component} from 'react';

import TaskColumn from '../TaskColumn/TaskColumn';

import Grid from '@material-ui/core/Grid';

import './Team.scss';

import { APIService } from '../../Services/ApiService';
import { Task } from '../../Types/Task';
import { Team as TeamType } from '../../Types/Team';
import PrioritizedList from '../../Types/PrioritizedList';

type teamProp = { teamName: string };

type gridItemSizeType = boolean | 1 | "auto" | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;

type stateType = {
    newTaskName: string;
    newTaskDescription: string;
    newTaskEffort: number;
    TeamName: string;
    TeamColumns: PrioritizedList[];
    ColumnWidthMd: gridItemSizeType,
    ColumnWidthSm: gridItemSizeType,
    ColumnWidthXs: gridItemSizeType
}


export default class Team extends Component<teamProp, stateType> {
    constructor(props:teamProp) {
        super(props);
        this.state = {
            newTaskName: "",
            newTaskDescription: "",
            newTaskEffort: 1,
            TeamName: props.teamName,
            TeamColumns: [],
            ColumnWidthMd: 3,
            ColumnWidthSm: 6,
            ColumnWidthXs: 12,
        };

        this.RefreshTeam();
    };

    RefreshTeam = () => {
        APIService.GetTeam(this.props.teamName).then(response => {
            let team = TeamType.GetFromApiResponse(response);
            this.setState({
                TeamName: team.name,
                TeamColumns: team.taskColumns,
                ColumnWidthMd: this.getMdColumnSize(team.taskColumns.length),
                ColumnWidthSm: this.getSmColumnSize(team.taskColumns.length),
                ColumnWidthXs: this.getXsColumnSize(team.taskColumns.length)
            });
        });
    };

    RefreshNewTask = () => {
        this.setState({
            newTaskName: "",
            newTaskDescription: "",
            newTaskEffort: 1
        });
    };

    SaveNewTask = () => {
        APIService.PostTask(this.props.teamName, new Task(this.state.newTaskName, this.state.newTaskDescription, this.state.newTaskEffort))
        .then(response => {
            this.RefreshTeam();
            this.RefreshNewTask();
        });
    };

    getGridItemSize = (numberOfColumns: number): number => 12 / numberOfColumns;

    getMdColumnSize = (numberOfColumns: number): gridItemSizeType => {
        return this.getGridItemSize(numberOfColumns) as gridItemSizeType;
    };

    getSmColumnSize = (numberOfColumns: number): gridItemSizeType => {
        return ( this.getGridItemSize(numberOfColumns) * 2 ) as gridItemSizeType;
    };

    getXsColumnSize = (numberOfColumns: number): gridItemSizeType => {
        return ( this.getGridItemSize(numberOfColumns) * 4 ) as gridItemSizeType;
    }

    render() {
        return (
            <Grid container className="center">
                <Grid item xs={12}>
                    <h1>{this.state.TeamName}</h1>    
                </Grid>
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <input type="text" value={this.state.newTaskName} onChange={event => this.setState({ newTaskName: event.target.value})}></input>
                    </Grid>
                    <Grid item xs={12}>
                        <input type="text" value={this.state.newTaskDescription} onChange={event => this.setState({ newTaskDescription: event.target.value})}></input>
                    </Grid>
                    <Grid item xs={12}>
                        <input type="number" value={this.state.newTaskEffort} onChange={event => this.setState({ newTaskEffort: +event.target.value})}></input>
                    </Grid>
                    <Grid item xs={12}>
                        <button onClick={this.SaveNewTask}>Save Task</button>
                    </Grid>
                </Grid>
                <Grid container xs={12}>
                    {this.state.TeamColumns.map(tc => 
                        <Grid key={tc.name} item md={this.state.ColumnWidthMd} sm={this.state.ColumnWidthSm} xs={this.state.ColumnWidthXs}>
                            <TaskColumn key={tc.name} List={tc}/>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        )
    }
}
