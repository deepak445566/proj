let users = [];
let userIdCounter = 1;

const findUserByEmail = (email) => users.find(user => user.email === email);
const findUserById = (id) => users.find(user => user.id === id);

const createUser = (userData) => {
  const newUser = {
    id: userIdCounter++,
    ...userData,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  return newUser;
};

const updateUser = (id, updates) => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return null;
  
  users[userIndex] = { ...users[userIndex], ...updates };
  return users[userIndex];
};

const getAllUsers = () => users;

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  getAllUsers
};