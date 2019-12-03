import IQueryable from "./IQueryable";
import TaskHolder from "./TaskHolder";

export class Team extends TaskHolder implements IQueryable {
    public name: string;
    constructor(name: string) {
        super();
        this.name = name;
    }

    public Query(q: string) {
        return this.name.toLowerCase().indexOf(q) !== -1;
    }
}
