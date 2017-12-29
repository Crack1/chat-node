const expect = require('expect');

const {
    Users
} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Erwin',
            room: 'React'
        }, {
            id: '2',
            name: 'Romulo',
            room: 'Node Course'
        }, {
            id: '3',
            name: 'Liliana',
            room: 'Node Course'
        }];
    })


    it('Should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Erwin',
            room: 'The office Fans'
        };
        var resUser = users.addUsser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('Should return names for node course', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Romulo', 'Liliana']);
    });
    it('Should return names for React', () => {
        var userList = users.getUserList('React');
        expect(userList).toEqual('Erwin');
    });

    it('Should remove a user', () => {
        var userId = '2';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
    it('Should not remove a user', () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('Should Find a user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });
    it('Should not Find a user', () => {
        var userId = '99';
        var user = users.getUser(userId);
        expect(user).toNotExist;
    });
});