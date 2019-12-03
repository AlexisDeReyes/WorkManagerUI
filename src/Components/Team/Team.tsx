import React, { Component} from 'react';

import TaskColumn from '../TaskColumn/TaskColumn';

import { APIService } from '../../Services/ApiService';
import { Task } from '../../Types/Task';
import PrioritizedList from '../../Types/PrioritizedList';

type teamProp = { teamName: string };

type stateType = {
    newTaskName: string;
    newTaskDescription: string;
    newTaskEffort: number;
    TeamName: string;
    TeamColumns: PrioritizedList[];
}

export default class Team extends Component<teamProp, stateType> {
    constructor(props:teamProp) {
        super(props);
        this.state = {
            newTaskName: "",
            newTaskDescription: "",
            newTaskEffort: 1,
            TeamName: props.teamName,
            TeamColumns: []
        };

        this.RefreshTeam();
    }


    RefreshTeam = () => {
        APIService.GetTeam(this.props.teamName).then(response => {
            this.setState({
                TeamName: response.data.name,
                TeamColumns: response.data.taskColumns
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
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.TeamName}</h1>
                <input type="text" value={this.state.newTaskName} onChange={event => this.setState({ newTaskName: event.target.value})}></input>
                <input type="text" value={this.state.newTaskDescription} onChange={event => this.setState({ newTaskDescription: event.target.value})}></input>
                <input type="number" value={this.state.newTaskEffort} onChange={event => this.setState({ newTaskEffort: +event.target.value})}></input>
                <button onClick={this.SaveNewTask}>Save Task</button>
                {this.state.TeamColumns.map(tc => <TaskColumn key={tc.name} List={tc}/>)}
            </div>
        )
    }
}
