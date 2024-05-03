const getUsers = "SELECT * FROM Users";
const getUsersById = "SELECT * FROM Users WHERE id = $1";
const addUser = "CALL SPICreateUser($1, $2, $3, $4, $5)";
const removeUser = "CALL SPDeleteUserByID($1)";
const updateUser = "CALL SPUpdateUserByID($1, $2, $3, $4, $5)"



// Clients CRUD
const addClient = `
    CALL SPCreateClient($1, $2, $3, $4);
`;

const getClients = `
    SELECT *
    FROM Users
    WHERE type = 'CLIENT';
`;

const getClientById = `
    SELECT * 
    FROM Users 
    WHERE id = $1;
`;

const updateClient = `
    CALL SPUpdateUserByID($1, $2, $3, $4, $5);
`;

const removeClient = `
    CALL SPDeleteUserByID($1);
`;

// Employees CRUD
const addEmployee = `
    CALL SPCreateEmployee($1, $2, $3, $4);
`;

const getEmployees = `
    SELECT *
    FROM Users
    WHERE type = 'EMPLOYEE';
`;

const getEmployeeById = `
    SELECT * 
    FROM Users 
    WHERE id = $1;
`;

const updateEmployee = `
    CALL SPUpdateUserByID($1, $2, $3, $4, $5);
`;

const removeEmployee = `
    CALL SPDeleteUserByID($1);
`;



module.exports = {
    getUsers,
    getUsersById,
    addUser,
    removeUser,
    updateUser,

    // Clients
    addClient,
    getClients,
    getClientById,
    updateClient,
    removeClient,

    // Employees
    addEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    removeEmployee,



};