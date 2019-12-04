import DBItem from "./DBItem";
import PrioritizedList from "./PrioritizedList";
import { Task, TaskStatus } from "./Task";

function getNumberFromTaskStatus(status: string): number {
    const stat = status as TaskStatus;

    switch(stat){
        case TaskStatus.New:
            return 0;
        case TaskStatus.Ready:
            return 1;
        case TaskStatus.InProgress:
            return 2;
        case TaskStatus.Done:
            return 3;
        default:
            return 4;
    }
}

export default class TaskHolder extends DBItem {
    public taskColumns: PrioritizedList[];
    constructor() {
        super();
        this.taskColumns = [];
    }

    public AddTask(newTask: Task) {
        this.GetColumn(TaskStatus.New).AddTask(newTask);
        return newTask;
    }

    public RemoveTask(task: Task) {
        this.GetColumn(task.status).RemoveTask(task);
        return task;
    }

    public ChangeTaskStatus(task: Task, newStatus: TaskStatus) {

        this.GetColumn(task.status).RemoveTask(task);
        this.GetColumn(newStatus).AddTask(task);
        task.status = newStatus;
    }

    public SortColumns() {
        this.taskColumns.sort(this.SortByColumnStatus);
    }

    private GetColumn(status: TaskStatus) {
        const existingColumn = this.taskColumns.find((c) => c.name === status);
        if (existingColumn) {
            return existingColumn;
        } else {
            const newColumn = new PrioritizedList(status);
            this.taskColumns.push(newColumn);
            this.SortColumns();
            return newColumn;
        }
    }

    private SortByColumnStatus(a: PrioritizedList, b:PrioritizedList): number {
        const [first, second] = [a.name, b.name].map(getNumberFromTaskStatus);
        return first - second;
    }
}
