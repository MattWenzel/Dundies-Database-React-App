// db-connector and "db.pool.query" logic for connecting to database is adapted from the osu-cs340-ecampus nodejs-starter-app:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app
const db = require('../Models/db-connector.js');

// Get all roles from the database
const selectRoles = (req, res) => {
    const selectNamesQuery = 'SELECT * FROM Roles';
    db.pool.query(selectNamesQuery, (err, results, fields) => {
        const roles = results.map(result => {
            return {
                role_id: result.role_id,
                role_name: result.role_name,
                base_salary: `$${result.base_salary}`,
            };
        });
        res.status(200).json(roles);
    });
}

// get all role names from the database
const selectRoleData = (req, res) => {
    const role_name = req.query.role_name;
    const selectRolesDataQuery = 'SELECT * FROM Roles WHERE role_name = ?';
    db.pool.query(selectRolesDataQuery, [role_name], (err, results, fields) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching role data' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

// get data for a single role from the database
const selectRoleName = (req, res) => {
    const selectRolesQuery = 'SELECT role_name FROM Roles';
    db.pool.query(selectRolesQuery, (err, results, fields) => {
        res.status(200).json(results);

    });
}

// Insert a new role
const insertRole = (req, res) => {
    const insertRoleQuery = 'INSERT INTO Roles (role_name, base_salary) VALUES (?, ?)';
    const role_name = req.body.role_name;
    const base_salary = req.body.base_salary;
    db.pool.query(insertRoleQuery, [role_name, base_salary], (err, results, fields) => {
        res.status(200).json(results);
    });
}

// Update an existing role
const updateRole = (req, res) => {
    const updateRoleQuery = 'UPDATE Roles SET role_name = ?, base_salary = ? WHERE role_name = ?';
    const role_name = req.body.role_name;
    const base_salary = req.body.base_salary;
    db.pool.query(updateRoleQuery, [role_name, base_salary, role_name], (err, results, fields) => {
        res.status(200).json(results);
    });
}

// Delete an existing role
const deleteRole = (req, res) => {
    const deleteRoleQuery = 'DELETE FROM Roles WHERE role_id = ?';
    const role_id = req.body.index;
    db.pool.query(deleteRoleQuery, [role_id], (err, results, fields) => {
        res.status(200).json(results);
    });
}

module.exports = { selectRoles, selectRoleName, insertRole, updateRole, deleteRole, selectRoleData };