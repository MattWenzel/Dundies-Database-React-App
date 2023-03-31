// db-connector and "db.pool.query" logic for connecting to database is adapted from the osu-cs340-ecampus nodejs-starter-app:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app
const db = require('../Models/db-connector.js');

// get all products ordered from the database
const selectProductsOrderd = (req, res) => {
    const selectProductsOrderdQuery = 
    `SELECT 
            Products_Ordered.product_order_id, 
            Products_Ordered.order_id, 
            Products.name as product_name, 
            Products_Ordered.quantity, 
            Products_Ordered.cost_per_unit
        FROM 
            Products_Ordered
        JOIN 
            Products ON Products_Ordered.product_id = Products.product_id`;
    db.pool.query(selectProductsOrderdQuery, (err, results, fields) => {
        const productsOrdered = results.map(result => {
            return {
                product_order_id: result.product_order_id,
                order_id: result.order_id,
                product_name: result.product_name,
                quantity: result.quantity,
                cost_per_unit: `$${result.cost_per_unit}`,
            };
        });
        res.status(200).json(productsOrdered);
    });
}

// get data for a single products ordered record from the database
const selectProductOrderData = (req, res) => {
    const product_order_id = req.query.product_order_id;
    const selectProductOrderDataQuery = 'SELECT * FROM Products_Ordered WHERE product_order_id = ?';
    db.pool.query(selectProductOrderDataQuery, [product_order_id], (err, results, fields) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching product data' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

// get all product ordered ids from the database
const selectProductOrderID = (req, res) => {
    const selectProductOrdersOrderID= 'SELECT product_order_id FROM Products_Ordered';
    db.pool.query(selectProductOrdersOrderID, (err, results, fields) => {
        res.status(200).json(results);
    });
}

// Insert a new products ordered record
const insertProductsOrdered = (req, res) => {
    const order_id = req.body.order_id;
    const product_name = req.body.name;
    const quantity = req.body.quantity;
    const cost_per_unit = req.body.cost_per_unit;
    const insertProductsOrderdQuery = `INSERT INTO Products_Ordered (order_id, product_id, quantity, cost_per_unit) SELECT '${order_id}', product_id, '${quantity}', '${cost_per_unit}' FROM Products WHERE name = '${product_name}'`;
    db.pool.query(insertProductsOrderdQuery, (err, results, fields) => {
        console.log(JSON.stringify(results));
    });
}

// Delete a products ordered record
const deleteProductsOrdered = (req, res) => {
    const product_order_id = req.body.index;
    const deleteProductsOrderedQuery = `DELETE FROM Products_Ordered WHERE product_order_id = ${product_order_id}`;
    db.pool.query(deleteProductsOrderedQuery, (err, results, fields) => {
        res.status(200).send("success");
    });
}

// Update a products ordered record
const updateProductsOrdered = (req, res) => {
    const product_order_id = req.body.product_order_id;
    const order_id = req.body.order_id;
    const product_name = req.body.name;
    const quantity = req.body.quantity;
    const cost_per_unit = req.body.cost_per_unit;
    const updateProductsOrderedQuery = `UPDATE Products_Ordered SET order_id = '${order_id}', product_id = (SELECT product_id FROM Products WHERE name = '${product_name}'), quantity = '${quantity}', cost_per_unit = '${cost_per_unit}' WHERE product_order_id = '${product_order_id}'`;
    console.log(updateProductsOrderedQuery);
    db.pool.query(updateProductsOrderedQuery, (err, results, fields) => {
        console.log("Update Success");
    });
}


module.exports = {selectProductsOrderd, insertProductsOrdered, deleteProductsOrdered, updateProductsOrdered, selectProductOrderID, selectProductOrderData};