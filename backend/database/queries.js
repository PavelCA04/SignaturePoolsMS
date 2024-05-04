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

// Inventory CRUD
const addItem = `
    CALL SPCreateItem($1, $2, $3);
`

const getItems = `
    SELECT *
    FROM Inventory;
`;

const getItemById = `
    SELECT *
    FROM Inventory
    WHERE id = $1;
`;

const updateItem = `
    CALL SPUpdateItemByID($1, $2, $3);
`

const removeItem = `
    CALL SPDeleteItemByID($1);
`

// Meeting CRUD
const addMeeting = `
    CALL SPInsertMeeting($1, $2);
`;

const getMeetings = `
    SELECT *
    FROM Meetings;
`;

const getMeetingById = `
    SELECT *
    FROM Meetings
    WHERE id = $1;
`;

const updateMeeting = `
    CALL SPUpdateMeetingByID($1, $2, $3);
`;

const removeMeeting = `
    CALL SPDeleteMeetingByID($1);
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

    // Inventory
    addItem,
    getItems,
    getItemById,
    updateItem,
    removeItem,

    // Meeting
    addMeeting,
    getMeetings,
    getMeetingById,
    updateMeeting,
    removeMeeting,
};