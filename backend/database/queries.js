const getUsers = "SELECT * FROM Users";
const getUsersById = "SELECT * FROM Users WHERE id = $1";
const addUser = "CALL SPICreateUser($1, $2, $3, $4, $5)";
const removeUser = "CALL SPDeleteUserByID($1)";
const updateUser = "CALL SPUpdateUserByID($1, $2, $3, $4, $5)"


module.exports = {
    getUsers,
    getUsersById,
    addUser,
    removeUser,
    updateUser,
};