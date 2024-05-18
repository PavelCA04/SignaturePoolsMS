const pool = require('../database/dbConnection');
const queries = require('../database/queries');

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUsersById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    } )
}

const addUser = (req, res) => {
    const { name, email, address, phoneNumber, type } = req.body;

    pool.query(queries.addUser, [name, email, address, phoneNumber, type], (error, results) => {
        if (error) throw error;
        res.status(201).send("User Created Successfully")
    })
}

const removeUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.removeUser, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("User Remove Successfully");
    })
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getUsersById, [id], (error, results) => {
        const userFound = !results.rows.length;
        if (userFound) {
            res.send("User does not exist.")
        }

        const { name, email, address, phoneNumber } = req.body;

        pool.query(queries.updateUser, [id, name, email, address, phoneNumber], (error, results) => {
            if(error) throw error;
            res.status.send("User Updated Successfully");
        })
    })
}

// Clients functions
const addClient = (req, res) => {
    const { name, email, address, phoneNumber } = req.body;

    pool.query(queries.addClient, [name, email, address, phoneNumber], (error, results) => {
        if (error){
            res.status(500).send("Client not created correctly");
            console.log(error.message);
        } else{
            res.status(201).send("Client created successfully");
        }
    })
}

const getClients = (req, res) => {
    const {search} = req.query;
    if (search) {
        pool.query(queries.getClientsByName, [search], (error, results) => {
            if (error){
                res.status(500).json("Client not found");
                console.log(error.message);
            } else{
                res.status(200).json(results.rows);
            };
        })
    } else {
        pool.query(queries.getClients, (error, results) => {
            if(error){
                res.status(500).json("Clients not available");
                console.log(error.message);
            } else{
                res.status(200).json(results.rows);
            }
        });
    }
};

const getClientById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getClientById, [id], (error, results) => {
        if (error){
            res.status(500).json("Client not found");
            console.log(error.message);
        } else{
            res.status(200).json(results.rows);
        };
    } )
}

const updateClient = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getClientById, [id], (error, results) => {
        const clientNotFound = !results.rows.length;
        if (clientNotFound) {
            res.send("Client not found.")
        } else {
            const { name, email, address, phoneNumber } = req.body;

            pool.query(queries.updateClient, [id, name, email, address, phoneNumber], (error, results) => {
                if(error){
                    res.status(500).send("Client not updated correctly");
                    console.log(error.message);
                } else {
                    res.status(201).send("User Updated Successfully");
                };
                
            })
        }
    })
}

const removeClient = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.removeClient, [id], (error, results) => {
        if (error){
            console.log(error.message);
        } else{
            res.status(200).send("Client remove successfully");
        };
    })
}

// Employees functions
const addEmployee = (req, res) => {
    const { name, email, address, phoneNumber } = req.body;

    pool.query(queries.addEmployee, [name, email, address, phoneNumber], (error, results) => {
        if (error){
            res.status(500).send("Employee not created correctly");
            console.log(error.message);
        } else{
            res.status(201).send("Employee created successfully");
        }
    })
}

const getEmployees = (req, res) => {
    const {search} = req.query;
    if (search) {
        pool.query(queries.getEmployeesByName, [search], (error, results) => {
            if (error){
                res.status(500).json("Client not found");
                console.log(error.message);
            } else{
                res.status(200).json(results.rows);
            };
        })
    } else {
        pool.query(queries.getEmployees, (error, results) => {
            if(error){
                res.status(500).json("Clients not available");
                console.log(error.message);
            } else{
                res.status(200).json(results.rows);
            }
        });
    }
};

const getEmployeeById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getEmployeeById, [id], (error, results) => {
        if (error){
            res.status(500).json("Employee not found");
            console.log(error.message);
        } else{
            res.status(200).json(results.rows);
        };
    } )
}

const updateEmployee = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getEmployeeById, [id], (error, results) => {
        const clientNotFound = !results.rows.length;
        if (clientNotFound) {
            res.send("Employee not found.")
        } else {
            const { name, email, address, phoneNumber } = req.body;

            pool.query(queries.updateEmployee, [id, name, email, address, phoneNumber], (error, results) => {
                if(error){
                    res.status(500).send("Employee not updated correctly");
                    console.log(error.message);
                } else {
                    res.status(201).send("Employee Updated Successfully");
                };
            })
        }
    })
}

const removeEmployee = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.removeEmployee, [id], (error, results) => {
        if (error){
            console.log(error.message);
        } else{
            res.status(200).send("Employee remove successfully");
        };
    })
}

// Inventory Functions
const addItem = (req, res) => {
    const { name, description, unitsAvailable, pricePerUnit } = req.body;

    pool.query(queries.addItem, [ name, description, unitsAvailable, pricePerUnit ], (error, results) => {
        if (error){
            res.status(500).send("Item not created correctly");
            console.log(error.message);
        } else{
            res.status(201).send("Item created successfully");
        }
    })
}

const getItems = (req, res) => {
    const {search} = req.query;
    if (search) {
        pool.query(queries.getItemByName, [search], (error, results) => {
            if (error){
                res.status(500).json("Client not found");
                console.log(error.message);
            } else{
                res.status(200).json(results.rows);
            };
        })
    } else {
        pool.query(queries.getItems, (error, results) => {
            if(error){
                res.status(500).json("Clients not available");
                console.log(error.message);
            } else{
                res.status(200).json(results.rows);
            }
        });
    }
};

const getItemById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getItemById, [id], (error, results) => {
        if (error){
            res.status(500).json("Item not found");
            console.log(error.message);
        } else{
            res.status(200).json(results.rows);
        };
    } )
}

const updateItem = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getItemById, [id], (error, results) => {
        const clientNotFound = !results.rows.length;
        if (clientNotFound) {
            res.send("Item not found.")
        } else {
            const { name, description, unitsAvailable, pricePerUnit } = req.body;

            pool.query(queries.updateItem, [ id, name, description, unitsAvailable, pricePerUnit ], (error, results) => {
                if(error){
                    res.status(500).send("Item not updated correctly");
                    console.log(error.message);
                } else {
                    res.status(201).send("Item Updated Successfully");
                };
            })
        }
    })
}

const removeItem = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.removeItem, [id], (error, results) => {
        if (error){
            console.log(error.message);
        } else{
            res.status(200).send("Item remove successfully");
        };
    })
}

// Meeting Functions
const addMeeting = (req, res) => {
    const { name, description, location, date } = req.body;

    pool.query(queries.addMeeting, [name, description, location, date], (error, results) => {
        if (error){
            res.status(500).send("Meeting not created correctly");
            console.log(error.message);
        } else{
            res.status(201).send("Meeting created successfully");
        }
    })
}

const getMeetings = (req, res) => {
    pool.query(queries.getMeetings, (error, results) => {
        if(error){
            res.status(500).json("Meeting not available");
            console.log(error.message);
        } else{
            res.status(200).json(results.rows);
        }
    });
};

const getMeetingById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getMeetingById, [id], (error, results) => {
        if (error){
            res.status(500).json("Meeting not found");
            console.log(error.message);
        } else{
            res.status(200).json(results.rows);
        };
    } )
}

const updateMeeting = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getMeetingById, [id], (error, results) => {
        const clientNotFound = !results.rows.length;
        if (clientNotFound) {
            res.send("Meeting not found.")
        } else {
            const { name, description, location, date } = req.body;

            pool.query(queries.updateMeeting, [ id, name, description, location, date ], (error, results) => {
                if(error){
                    res.status(500).send("Meeting not updated correctly");
                    console.log(error.message);
                } else {
                    res.status(201).send("Meeting Updated Successfully");
                };
            })
        }
    })
}

const removeMeeting = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.removeMeeting, [id], (error, results) => {
        if (error){
            console.log(error.message);
        } else{
            res.status(200).send("Meeting remove successfully");
        };
    })
}

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