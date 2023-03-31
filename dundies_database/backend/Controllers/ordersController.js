// db-connector and "db.pool.query" logic for connecting to database is adapted from the osu-cs340-ecampus nodejs-starter-app:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app
const db = require('../Models/db-connector.js');

// GET all orders from the database, replacing employee_id and customer_id with employee and customer names
const selectOrders = (req, res) => {
    const selectOrdersQuery =
        `SELECT Orders.order_id, Customers.name AS customer_name, Employees.name AS employee_name, Orders.total_cost, Orders.date
    FROM Orders
    JOIN Customers ON Orders.customer_id = Customers.customer_id
    JOIN Employees ON Orders.employee_id = Employees.employee_id`;
    db.pool.query(selectOrdersQuery, (err, results, fields) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }
        const orders = results.map(result => {
            return {
                order_id: result.order_id,
                customer_name: result.customer_name,
                employee_name: result.employee_name,
                total_cost: `$${result.total_cost}`,
                date: (new Date(result.date)).toLocaleDateString()
            };
        });
        res.status(200).json(orders);
    });
};

// GET data for a single order from the database
const selectOrderData = (req, res) => {
    const order_id = req.query.order_id;
    const selectOrderDataQuery = 'SELECT * FROM Orders WHERE order_id = ?';
    db.pool.query(selectOrderDataQuery, [order_id], (err, results, fields) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching order data' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

// GET all order id's
const selectOrderId = (req, res) => {
    const selectOrderIdQuery = 'SELECT order_id FROM Orders';
    db.pool.query(selectOrderIdQuery, (err, results, fields) => {
        res.status(200).json(results);
    });
}

// insert a new order into the database
const insertOrder = (req, res) => {
    const customer_name = req.body.customer_name;
    const employee_name = req.body.employee_name;
    const total_cost = req.body.total_cost;
    const date = req.body.date;
    const insertOrderQuery =
        `INSERT INTO Orders (customer_id, employee_id, total_cost, date)
        SELECT
          (SELECT customer_id FROM Customers WHERE name = '${customer_name}'),
          (SELECT employee_id FROM Employees WHERE name = '${employee_name}'),
          '${total_cost}',
          '${date}'`;
    db.pool.query(insertOrderQuery, (err, results, fields) => {
        console.log(JSON.stringify(results));
    });

}

// DELETE order
const deleteOrder = (req, res) => {
    const order_id = req.body.index;
    const deleteOrderQuery = `DELETE FROM Orders WHERE order_id = ${order_id}`;
    db.pool.query(deleteOrderQuery, (err, results, fields) => {
        res.status(200).send("success");
    });
}


// UPDATE order
const updateOrder = (req, res) => {
    const order_id = req.body.order_id;
    const customer_name = req.body.customer_name;
    const employee_name = req.body.employee_name;
    const total_cost = req.body.total_cost;
    const date = req.body.date;
    const updateOrderQuery = 
    `UPDATE Orders
    SET
      customer_id = (SELECT customer_id FROM Customers WHERE name = '${customer_name}'),
      employee_id = (SELECT employee_id FROM Employees WHERE name = '${employee_name}'),
      total_cost = '${total_cost}',
      date = '${date}'
    WHERE order_id = ${order_id}`;
    db.pool.query(updateOrderQuery, (err, results, fields) => {
        console.log("Update Success");
    });

}

module.exports = { selectOrders, selectOrderId, insertOrder, deleteOrder, updateOrder, selectOrderData };
