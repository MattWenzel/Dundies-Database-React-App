-- Group 95
-- Matthew Wenzel and Ahron Townsley


-- Create Operations
-- add a new employee
INSERT INTO Employees (name, address, email, phone_number, role_id)
VALUES (:employee_nameInput, :addressInput, :emailInput, :phoneInput, 
 (SELECT role_id FROM Roles WHERE role_name = :role_name_from_dropdown));
-- add a new role
INSERT INTO Roles (role_name, base_salary)
VALUES (:role_nameInput, :base_salaryInput);
-- add a new customer
INSERT INTO Customers (name, address, email, phone_number, employee_id)
VALUES (:customer_nameInput, :addressInput, :emailInput, :phoneInput, 
 (SELECT employee_id FROM Employees WHERE name = :emplpyee_name_from_dropdown));
-- add a new product
INSERT INTO Products (name, quantity, cost_per_unit)
VALUES (:product_nameInput, :quantityInput, :cost_per_unitInput);
-- add a new order
INSERT INTO Orders (customer_id, employee_id, total_cost, date)
VALUES (
    (SELECT customer_id FROM Customers WHERE name = :customer_name_from_dropdown), 
    (SELECT employee_id FROM Employees WHERE name = :emplpyee_name_from_dropdown), :total_costInput, :dateInput);
-- insert into Products_Ordered
INSERT INTO Products_Ordered (order_id, product_id, quantity, cost_per_unit)
VALUES (:order_id_selected_from_orders_page, (SELECT product_id FROM Products WHERE name = :product_name_from_dropdown), :quantityInput, :cost_per_unitInput);


-- Read Operations
-- display contents of Employees table
SELECT Employees.employee_id, Employees.name, Employees.address, Employees.email, Employees.phone_number, Roles.role_name 
FROM Employees JOIN Roles ON Employees.role_id = Roles.role_id
-- display contents of Roles table
SELECT role_id, role_name, base_salary FROM Roles;
-- display contents of Customers table
SELECT Customers.customer_id, Customers.name, Customers.address, Customers.email, Customers.phone_number, Employees.name AS employee_name 
    FROM Customers 
    LEFT JOIN Employees 
    ON Customers.employee_id = Employees.employee_id;
-- display contents of Orders table
SELECT Orders.order_id, Customers.name AS customer_name, Employees.name AS employee_name, Orders.total_cost, Orders.date
    FROM Orders
    JOIN Customers ON Orders.customer_id = Customers.customer_id
    JOIN Employees ON Orders.employee_id = Employees.employee_id;
-- display contents of Products table
SELECT * FROM Products;
-- display contents of Products_Ordered table
SELECT product_order_id, order_id, product_id, quantity, cost_per_unit FROM Products_Ordered;


-- Update Operations
-- update an Employee with new information
UPDATE Employees
SET name = :employee_nameInput, address = :addressInput, email = :emailInput, phone_number = :phoneInput, 
role_id = (SELECT role_id FROM Roles WHERE role_name = :role_name_from_dropdown)
WHERE employee_id = :employee_id_from_update_form;
-- update a Role with new information
UPDATE Roles
SET role_name = :role_nameInput, base_salary = :salaryInput,
WHERE role_id = :role_id_from_update_form;
-- update a Customer with new information
UPDATE Customers
SET name = :customer_nameInput, address = :addressInput, email = :emailInput, phone_number = :phoneInput, 
employee_id = (SELECT employee_id FROM Employees WHERE name = :emplpyee_name_from_dropdown)
WHERE customer_id = :customer_id_from_update_form;
-- update an Order with new information
UPDATE Orders
SET customer_id = (SELECT customer_id FROM Customers WHERE name = :customer_name_from_dropdown), 
employee_id = (SELECT employee_id FROM Employees WHERE name = :employee_name_from_dropdown),
total_cost = :total_costInput, date = :dateInput
WHERE order_id = :order_id_from_update_form;
-- update a Product with new information
UPDATE Products
SET name = :product_nameInput, quantity = :quantityInput, cost_per_unit = cost_per_unitInput
WHERE product_id = :product_id_from_update_form
-- update Products_Ordered with new information
UPDATE Products_Ordered
SET order_id = :order_idInput, product_id = :product_idInput,
quantity = :quantityInput, cost_per_unit = :cost_per_unitInput
WHERE product_order_id = :product_order_id_from_update_form


-- Delete Operations
-- delete an Employee
DELETE FROM Employees WHERE employee_id = :employee_id_selected_from_employee_page;
-- delete a Role 
DELETE FROM Roles WHERE role_id = :role_id_selected_from_role_page;
-- delete a Customer 
DELETE FROM Customers WHERE customer_id = :customer_id_selected_from_customer_page;
-- delete an Order 
DELETE FROM Orders WHERE order_id = :order_id_selected_from_orders_page;
-- delete a Product 
DELETE FROM Products WHERE product_id = :product_idselected_from_product_page;