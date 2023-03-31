// db-connector and "db.pool.query" logic for connecting to database is adapted from the osu-cs340-ecampus nodejs-starter-app:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app
const db = require('../Models/db-connector.js');

// get all employees from the database, replacing role_id with role name
const selectEmployees = (req, res) => {
    const selectEmployeesQuery = 'SELECT Employees.employee_id, Employees.name, Employees.address, Employees.email, Employees.phone_number, Roles.role_name FROM Employees JOIN Roles ON Employees.role_id = Roles.role_id';
    db.pool.query(selectEmployeesQuery, (err, results, fields) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }
        const employees = results.map(result => {
            return {
                employee_id: result.employee_id,
                name: result.name,
                address: result.address,
                email: result.email,
                phone_number: result.phone_number,
                role_name: result.role_name
            };
        });
        res.status(200).json(employees);
    });
};

// get data for a single employee from the database
const selectEmployeeData = (req, res) => {
    const employeeName = req.query.name;
    const selectEmployeeDataQuery = 'SELECT * FROM Employees WHERE name = ?';
    db.pool.query(selectEmployeeDataQuery, [employeeName], (err, results, fields) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching employee data' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

// get all employee names from the database
const selectEmployeeNames = (req, res) => {
    const selectNamesQuery = 'SELECT name FROM Employees';
    db.pool.query(selectNamesQuery, (err, results, fields) => {
        res.status(200).json(results);
    });
}

// insert a new employee into the database
const insertEmployee = (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const role_name = req.body.role_name;
    const insertEmployeeQuery = `INSERT INTO Employees (name, address, email, phone_number, role_id) SELECT '${name}', '${address}', '${email}', '${phone_number}', role_id FROM Roles WHERE role_name = '${role_name}'`;
    db.pool.query(insertEmployeeQuery, (err, results, fields) => {
        console.log(JSON.stringify(results));
    });

}

// delete an employee from the database
const deleteEmployee = (req, res) => {
    const employee_id = req.body.index;
    const deleteEmployeeQuery = `DELETE FROM Employees WHERE employee_id = ${employee_id}`;
    db.pool.query(deleteEmployeeQuery, (err, results, fields) => {
        res.status(200).send("success");
    });
}

// update an employee in the database
const updateEmployee = (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const role_name = req.body.role_name;

    const updateEmployeeQuery = `UPDATE Employees SET address = '${address}', email = '${email}', phone_number = '${phone_number}', role_id = (SELECT role_id FROM Roles WHERE role_name = '${role_name}') WHERE name = '${name}'`;
    db.pool.query(updateEmployeeQuery, (err, results, fields) => {
        console.log("Update Success");
    });


}

module.exports = { selectEmployees, selectEmployeeNames, insertEmployee, deleteEmployee, updateEmployee, selectEmployeeData};