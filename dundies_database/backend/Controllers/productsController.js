// db-connector and "db.pool.query" logic for connecting to database is adapted from the osu-cs340-ecampus nodejs-starter-app:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app
const db = require('../Models/db-connector.js');

// Select all products
const selectProducts = (req, res) => {
    const selectProductsQuery = 'SELECT * FROM Products';
    db.pool.query(selectProductsQuery, (err, results, fields) => {
        //console.log(results);
        const products = results.map(result => {
            return {
                product_id: result.product_id,
                name: result.name,
                quantity: result.quantity,
                cost_per_unit: `$${result.cost_per_unit}`,
            };
        });
        res.status(200).json(products);
    });
}

// get all product names from the database
const selectProductName = (req, res) => {
    const selectRolesQuery = 'SELECT name FROM Products';
    db.pool.query(selectRolesQuery, (err, results, fields) => {
        res.status(200).json(results);

    });
}

// get data for a single product from the database
const selectProductData = (req, res) => {
    const product_name = req.query.name;
    const selectProductDataQuery = 'SELECT * FROM Products WHERE name = ?';
    db.pool.query(selectProductDataQuery, [product_name], (err, results, fields) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching product data' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

// Insert a new product
const insertProduct = (req, res) => {
    const name = req.body.name;
    const quantity = req.body.quantity;
    const cost_per_unit = req.body.cost_per_unit;
    const insertProductQuery = `INSERT INTO Products (name, quantity, cost_per_unit) VALUES ('${name}', '${quantity}', '${cost_per_unit}')`;
    db.pool.query(insertProductQuery, (err, results, fields) => {
        res.status(200).json(results);
    });
}


// Update an existing product
const updateProduct = (req, res) => {
    const name = req.body.name;
    const quantity = req.body.quantity;
    const cost_per_unit = req.body.cost_per_unit;
    const updateProductQuery = `UPDATE Products SET quantity = '${quantity}', cost_per_unit = '${cost_per_unit}' WHERE name = '${name}'`;
    console.log(updateProductQuery)
    db.pool.query(updateProductQuery, (err, results, fields) => {
        res.status(200).json(results);
    });
}

// Delete an existing product
const deleteProduct = (req, res) => {
    const deleteProductQuery = `DELETE FROM Products WHERE product_id = '${req.body.index}'`;
    db.pool.query(deleteProductQuery, (err, results, fields) => {
        res.status(200).json(results);
    });
}


module.exports = { selectProducts, selectProductName, insertProduct, updateProduct, deleteProduct, selectProductData };