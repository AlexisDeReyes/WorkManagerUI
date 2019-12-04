import axios from 'axios';
import { Team } from '../Types/Team';
import { Task } from '../Types/Task';

let APIConfig = axios.defaults;
APIConfig.baseURL = "http://localhost:8080";

export default class APIService {

    public static PostTeam = (name: string) => {
        return axios.post<Team>("/teams", {"name": name}, APIConfig);
    }

    public static PostTask = (team: string, task: Task) => {
        return axios.post<Task>(`/teams/${team}/tasks`, task, APIConfig);
    }

    public static GetTeam = (team: string) => {
        return axios.get<Team>(`/teams/${team}`, APIConfig);
    }
}