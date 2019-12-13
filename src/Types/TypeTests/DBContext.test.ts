import DBContext from '../DBContext';
import Team from '../Team';

import { v4 as uuid } from 'uuid';

it('Creates a team array', () => {
    expect((new DBContext()).teams).toEqual([]);
});

it('Retrieves team from DBContext', () => {
    const context = new DBContext();
    const id = uuid();
    const team = new Team(uuid());
    team.id = id;
    context.teams.push(team);

    expect(context.GetTeam(id)).toEqual(team);
    expect(context.GetTeam(team.name)).toEqual(team);
})