import React, { Component } from "react";

import { Task as TaskType } from "../../Types/Task";

interface TaskProp {
  // key: string;
  Task: TaskType;
}

export default class Task extends Component<TaskProp> {
  public render = () => (
    <div id={this.props.Task.id}>
      <h3>{this.props.Task.name}</h3>
      <ul>
        <li>Description: {this.props.Task.description}</li>
        <li>Effort: {this.props.Task.effort}</li>
        <li id="id">Id: {this.props.Task.id ? this.props.Task.id.substring(0, 5) : ""}...</li>
      </ul>
    </div>
  )
}
