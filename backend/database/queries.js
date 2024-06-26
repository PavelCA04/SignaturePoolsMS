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

const getClientsByName = `
    SELECT *
    FROM Users
    WHERE type = 'CLIENT' AND
          UPPER(name) LIKE '%' || UPPER($1) || '%';
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

const getEmployeesByName = `
    SELECT *
    FROM Users
    WHERE type = 'EMPLOYEE' AND
          UPPER(name) LIKE '%' || UPPER($1) || '%';
`;

const updateEmployee = `
    CALL SPUpdateUserByID($1, $2, $3, $4, $5);
`;

const removeEmployee = `
    CALL SPDeleteUserByID($1);
`;

// Inventory CRUD
const addItem = `
    CALL SPCreateItem($1, $2, $3, $4);
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

const getItemByName = `
    SELECT *
    FROM Inventory
    WHERE UPPER(name) LIKE '%' || UPPER($1) || '%';
`;

const updateItem = `
    CALL SPUpdateItemByID($1, $2, $3, $4, $5);
`

const removeItem = `
    CALL SPDeleteItemByID($1);
`

// Meeting CRUD
const addMeeting = `
    CALL SPCreateMeeting($1, $2, $3, $4);
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

const getMeetingsByName = `
    SELECT *
    FROM Meetings
    WHERE UPPER(name) LIKE '%' || UPPER($1) || '%';       
`;

const getMeetingsByDate = `
    SELECT *
    FROM Meetings
    WHERE date BETWEEN $1 AND $2
    ORDER BY date ASC;
`;

const updateMeeting = `
    CALL SPUpdateMeetingByID($1, $2, $3, $4, $5);
`;

const removeMeeting = `
    CALL SPDeleteMeetingByID($1);
`;


module.exports = {
    // Clients
    addClient,
    getClients,
    getClientsByName,
    getClientById,
    updateClient,
    removeClient,

    // Employees
    addEmployee,
    getEmployees,
    getEmployeeById,
    getEmployeesByName,
    updateEmployee,
    removeEmployee,

    // Inventory
    addItem,
    getItems,
    getItemById,
    getItemByName,
    updateItem,
    removeItem,

    // Meeting
    addMeeting,
    getMeetings,
    getMeetingById,
    getMeetingsByName,
    getMeetingsByDate,
    updateMeeting,
    removeMeeting,
};