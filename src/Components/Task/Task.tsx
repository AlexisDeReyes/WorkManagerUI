import React, { Component} from 'react';

import { Task as TaskType } from '../../Types/Task';

type TaskProp = {
    key: string;
    Task: TaskType  
};

export default class TaskColumn extends Component<TaskProp> {

    render = () => (
        <div>
            <h3>{this.props.Task.name}</h3>
            <ul>
                <li>Description: {this.props.Task.description}</li>
                <li>Effort: {this.props.Task.effort}</li>
                <li>Id: {this.props.Task.id ? this.props.Task.id.substring(0, 5) : ''}...</li>
            </ul>
        </div>
    );
}