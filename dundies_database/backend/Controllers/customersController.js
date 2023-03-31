// db-connector and "db.pool.query" logic for connecting to database is adapted from the osu-cs340-ecampus nodejs-starter-app:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app
const db = require('../Models/db-connector.js');

// get all customers from the database, replacing employee_id with employee name
const selectCustomers = (req, res) => {
    const selectCustomersQuery = 
    `SELECT Customers.customer_id, Customers.name, Customers.address, Customers.email, Customers.phone_number, Employees.name AS employee_name 
    FROM Customers 
    LEFT JOIN Employees 
    ON Customers.employee_id = Employees.employee_id`;
    db.pool.query(selectCustomersQuery, (err, results, fields) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }
        const customers = results.map(result => {
            return {
                customer_id: result.customer_id,
                name: result.name,
                address: result.address,
                email: result.email,
                phone_number: result.phone_number,
                employee_name: result.employee_name
            };
        });
        res.status(200).json(customers);
    });
}

// get data for a single customer from the database
const selectCustomerData = (req, res) => {
    const customerName = req.query.name;
    const selectCustomerDataQuery = 'SELECT * FROM Customers WHERE name = ?';
    db.pool.query(selectCustomerDataQuery, [customerName], (err, results, fields) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching customer data' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

// get all customer names from the database
const selectCustomerNames = (req, res) => {
    const selectNamesQuery = 'SELECT name FROM Customers';
    db.pool.query(selectNamesQuery, (err, results, fields) => {
        res.status(200).json(results);
    });
}

// insert a new customer into the database
const insertCustomer = (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const employee_name = req.body.employee_name;
    // different queries to handle if employee_name is null
    let insertCustomerQuery;
    if (employee_name === "" || employee_name === "null") {
        insertCustomerQuery = `INSERT INTO Customers (name, address, email, phone_number) VALUES ('${name}', '${address}', '${email}', '${phone_number}')`;
    } else {
        insertCustomerQuery = `INSERT INTO Customers (name, address, email, phone_number, employee_id) SELECT '${name}', '${address}', '${email}', '${phone_number}', employee_id FROM Employees WHERE name = '${employee_name}'`;

    }
    console.log(insertCustomerQuery)  
    db.pool.query(insertCustomerQuery, (err, results, fields) => {
    });

}

// delete a customer from the database
const deleteCustomer = (req, res) => {
    const customer_id = req.body.index;
    const deleteCustomerQuery = `DELETE FROM Customers WHERE customer_id = ${customer_id}`;
    db.pool.query(deleteCustomerQuery, (err, results, fields) => {
        res.status(200).send("success");
    });
}

// update a customer in the database
const updateCustomer = (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const employee_name = req.body.employee_name;
    // different queries to handle if employee_name is null
    let updateCustomerQuery;
    if (employee_name === "" || employee_name === "null") {
        updateCustomerQuery = `UPDATE Customers SET address = '${address}', email = '${email}', phone_number = '${phone_number}', employee_id = NULL WHERE name = '${name}'`;
    } else {
        updateCustomerQuery = `UPDATE Customers SET address = '${address}', email = '${email}', phone_number = '${phone_number}', employee_id = (SELECT employee_id FROM Employees WHERE name = '${employee_name}') WHERE name = '${name}'`;
    }
    console.log(updateCustomerQuery)  
    db.pool.query(updateCustomerQuery, (err, results, fields) => {
        console.log("Update Success");
    });

}

module.exports = { selectCustomers, selectCustomerNames, insertCustomer, deleteCustomer, updateCustomer, selectCustomerData};