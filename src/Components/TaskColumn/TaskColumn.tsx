import React from "react";

import Task from "../Task/Task";

import PrioritizedList from "../../Types/PrioritizedList";

interface TaskColumnProp {
  key: string;
  List: PrioritizedList;
}

export default function TaskColumn(props: TaskColumnProp) {
  return (
    <div>
      <h2>{props.List.name}</h2>
      {props.List.tasks.map((task) => (
        <Task key={task.id || ""} Task={task} />
      ))}
    </div>
  );
}
