class Users {
    constructor() {
        this.users = [];
    }
    addUsser(id, name, room) {
        var user = {
            id,
            name,
            room
        };
        this.users.push(user);
        return user;
    };


    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    };
    getUserList(room) {
        var users = this.users.filter((user) => {
            return user.room === room;
        });
        var nameArrays = users.map((user) => {
            return user.name;
        });

        return nameArrays;
    };
    removeUser(id) {
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);

        }
        return user;
    };
}

module.exports = {
    Users,
};