const express = require('express');
const {selectProductsOrderd, insertProductsOrdered, deleteProductsOrdered, updateProductsOrdered, selectProductOrderID, selectProductOrderData} = require('../Controllers/productsOrderedController');
const {selectEmployees, selectEmployeeNames, insertEmployee, deleteEmployee, updateEmployee, selectEmployeeData} = require('../Controllers/employeesController');
const {selectRoles, selectRoleName, insertRole, updateRole, deleteRole, selectRoleData} = require('../Controllers/rolesController');
const { selectProducts, selectProductName, insertProduct, updateProduct, deleteProduct, selectProductData} = require('../Controllers/productsController');
const { selectCustomers, selectCustomerNames, insertCustomer, deleteCustomer, updateCustomer, selectCustomerData} = require('../Controllers/customersController');
const { selectOrders, selectOrderId, insertOrder, deleteOrder, updateOrder, selectOrderData } = require('../Controllers/ordersController');
const router = express.Router();


// route SELECT employees
router.get('/employees', selectEmployees);
// route SELECT employee names from Employees for select menu
router.get('/employee-names', selectEmployeeNames)
// route SELECT employee data from Employees
router.get('/employee-data', selectEmployeeData)
// route CREATE employee
router.post('/insert-employee', insertEmployee);
// route UPDATE employee
router.put('/update-employee', updateEmployee);
// route DELETE employee
router.delete('/delete-employee', deleteEmployee);

// route SELECT customers
router.get('/customers', selectCustomers);
// route SELECT customer data from Customers
router.get('/customer-data', selectCustomerData)
// route SELECT customer names from Customers for select menu
router.get('/customer-names', selectCustomerNames)
// route CREATE customer
router.post('/insert-customer', insertCustomer);
// route UPDATE customer
router.put('/update-customer', updateCustomer);
// route DELETE customer
router.delete('/delete-customer', deleteCustomer);

//route SELECT roles
router.get('/roles', selectRoles);
// route SELECT role data from Roles
router.get('/role-data', selectRoleData)
// route SELECT role_name from Roles for select menu
router.get('/get-role-name', selectRoleName)
// route CREATE role
router.post('/insert-role', insertRole);
// route UPDATE role
router.put('/update-role', updateRole);
// route DELETE role
router.delete('/delete-role', deleteRole);

// route SELECT products
router.get('/products', selectProducts);
// route SELECT product data from Products
router.get('/product-data', selectProductData)
// route SELECT product names from Products for select menu
router.get('/get-product-names', selectProductName)
// route CREATE product
router.post('/insert-product', insertProduct);
// route UPDATE product
router.put('/update-product', updateProduct);
// route DELETE product
router.delete('/delete-product', deleteProduct);

// route SELECT orders
router.get('/orders', selectOrders);
// route SELECT order data from Orders
router.get('/order-data', selectOrderData)
// route SELECT order_id from Orders for select menu
router.get('/get-order-id', selectOrderId)
// route CREATE order
router.post('/insert-order', insertOrder);
// route UPDATE order
router.put('/update-order', updateOrder);
// route DELETE order
router.delete('/delete-order', deleteOrder);

// route SELECT products ordered
router.get('/products-ordered', selectProductsOrderd);
// route SELECT product order data from Products Ordered 
router.get('/product-order-data', selectProductOrderData)
// route CREATE product ordered
router.post('/insert-products-ordered', insertProductsOrdered);
// route UPDATE product ordred
router.put('/update-products-ordered', updateProductsOrdered);
// route DELETE product ordered
router.delete('/delete-products-ordered', deleteProductsOrdered);
// route SELECT product order ID from Products Ordered for select menu
router.get('/get-product-order-id', selectProductOrderID)

module.exports = router;