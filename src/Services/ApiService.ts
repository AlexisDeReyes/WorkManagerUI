import axios, { AxiosInstance } from "axios";
import Axios from "axios";
import { TeamTaskResponse } from "../Types/CompoundResources";
import { Task } from "../Types/Task";
import Team from "../Types/Team";

const APIConfig = axios.defaults;
APIConfig.baseURL = "http://localhost:8080";

export default class ApiService {
  constructor() {}

  public PostTeam = (name: string) => {
    return axios.post<Team>("/teams", { name }, APIConfig);
  }

  public PostTask = (team: string, task: Task) => {
    return axios.post<TeamTaskResponse>(`/teams/${team}/tasks`, task, APIConfig);
  }

  public GetTeam = (team: string) => {
    return axios.get<Team>(`/teams/${team}`, APIConfig);
  }
}
