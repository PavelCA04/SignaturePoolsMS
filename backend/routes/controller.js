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

module.exports = {
    getUsers,
    getUsersById,
    addUser,
    removeUser,
    updateUser,
};