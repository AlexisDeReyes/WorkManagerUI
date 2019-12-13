import ApiService from './ApiService';
import { v4 as uuid } from 'uuid';
import { Task } from '../Types/Task';
import Team from '../Types/Team';

describe('ApiService Tests', () => {
	let teamName: string;
	const WebService: ApiService = new ApiService();

	beforeEach(() => {
		teamName = uuid();
	});

	it('creates a team', () => {
		return WebService.PostTeam(teamName)
			.then(response => {
				expect(response.status).toEqual(200);
				expect(response.data as Team).not.toBeNull();
				expect(response.data.name).toEqual(teamName);
				expect(response.data.id).not.toBeNull();
			})
			.catch(error => {
				expect(error).toBeNull();
			});
	});

	it('creates a task', () => {
		return WebService.PostTeam(teamName)
			.then(response => {
				const name = uuid();
				const description = uuid();
				const newTask = new Task(name, description);
				return WebService.PostTask(teamName, newTask)
					.then(response => {
						expect(response.status).toEqual(200);

						const resultantTeam = Team.GetFromApiResponse(response.data.Team);
						expect(resultantTeam).not.toBeNull();

						const resultantTask = response.data.Task;
						expect(resultantTask.name).toEqual(name);
						expect(resultantTask.description).toEqual(description);
						expect(resultantTask.id).not.toBeUndefined();
					})
					.catch(error => expect(error).toBeNull());
			})
			.catch(error => {
				expect(error).toBeNull();
			});
	});

	it('retrieves a team', async () => {
		try {
			const response = await WebService.PostTeam(teamName);
			try {
				const response_1 = await WebService.GetTeam(teamName);
				return expect(response_1.data as Team).not.toBeNull();
			} catch (error) {
				return expect(error).toBeNull();
			}
		} catch (error_1) {
			expect(error_1).toBeNull();
		}
	});
});
