const users = [];

const addUser = ({ id, name, room }) => {
  // Ahmed to ayyaz
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if (existingUser) {
    return { error: `${name} username is taken` };
  }

  const user = { id, name, room };
  users.push(user)
  console.log(users)
  return user
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// const getUser = (id) => users.find(user => user.id === id)
const getUser =(id)=> {
  // console.log(id, "user id")
  // console.log(users)
  const index = users.find((user)=> user.id === id);
     if(index){
         return index
     }
  }

const getUserInRoom = (room) => users.filter(user.room === room);

module.exports = { addUser, removeUser, getUser, getUserInRoom}

