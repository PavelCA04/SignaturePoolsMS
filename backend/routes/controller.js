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
    pool.query(queries.getClients, (error, results) => {
        if(error){
            res.status(500).json("Clients not available");
            console.log(error.message);
        } else{
            res.status(200).json(results.rows);
        }
    });
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
    pool.query(queries.getEmployees, (error, results) => {
        if(error){
            res.status(500).json("Employee not available");
            console.log(error.message);
        } else{
            res.status(200).json(results.rows);
        }
    });
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