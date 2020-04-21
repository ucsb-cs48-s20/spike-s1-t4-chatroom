const users = []; // empty array of users

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => {
        // for each user in the array, check to see if
        // name and room is similar to the new user
        return user.room === room && user.name === name;
    });
    
    if (existingUser) {
        return { error: 'Username is taken' };
    }

    const bro = { id, name, room };
    users.push(bro);

    return { user: bro }; // returns the user object
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    // find the user with id = id passed to function

    // return the new user array
    if (index !== -1) {
        return users.splice(index, 1)[0];
        // remove one element from index, returns the spliced
        // user
    }
}

// return the user object with given id
const getUser = (id) => users.find((user) => user.id === id);

// return array of users in the current room
const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };