SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Create the Employees Table
CREATE Table Employees (
    employee_id INT AUTO_INCREMENT NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    role_id INT NOT NULL,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id) ON DELETE RESTRICT
);

-- Create the Roles Table
CREATE TABLE Roles (
    role_id INT AUTO_INCREMENT NOT NULL UNIQUE,
    role_name VARCHAR(50) NOT NULL,
    base_salary DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (role_id)
);
 
-- Create the Customers Table
CREATE Table Customers (
    customer_id INT AUTO_INCREMENT NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    employee_id INT,
    PRIMARY KEY (customer_id),
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE SET NULL
);

-- Create the Products Table
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT  NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL UNIQUE,
    quantity INT NOT NULL,
    PRIMARY KEY (product_id),
    cost_per_unit DECIMAL(10, 2) NOT NULL
);


-- Create the Orders Table
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT NOT NULL UNIQUE,
    customer_id INT NOT NULL,
    employee_id INT NOT NULL,
    total_cost DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY (order_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE
);

-- Create the Products_Ordered Intersection Table
CREATE TABLE Products_Ordered (
    product_order_id INT AUTO_INCREMENT NOT NULL UNIQUE,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    cost_per_unit DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (product_order_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE RESTRICT
);


-- Add sample data to the Employees table
INSERT INTO Employees (name, address, email, phone_number, role_id)
VALUES 
(
    'Michael Scott',
    '789 Park Ave, Scranton PA, 18501',
    'mscott@dundermifflin.com',
    '570-321-9876',
    1
),
(
    'Jim Halpert', 
    '123 Main St, Scranton PA, 18501', 
    'jhalpert@dundermifflin.com', 
    '570-555-1212', 
    2
),
(
    "Dwight Schrute",
    '159 Oak St, Scranton PA, 18501', 
    'dschrute@dundermifflin.com', 
    '570-357-2918', 
    2
),
(
    'Andy Bernard',
    '246 Broad St, Scranton PA, 18501',
    'abernard@dundermifflin.com',
    '570-654-3210',
    2
),
(
    'Stanley Hudson',
    '369 Maple Ave, Scranton PA, 18501',
    'shudson@dundermifflin.com',
    '570-246-1357',
    2
);

-- Add sample data to the Customers table
INSERT INTO Customers (name, address, email, phone_number, employee_id)
VALUES 
(
    'Barbara Allen', 
    '642 E Duke St, Scranton, PA 18509', 
    'ballen@gmail.com', 
    '570-469-0617', 
    1
),
(
    'Dunmore High School', 
    '300 W Warren St, Dunmore, PA 18509', 
    'dhs@dunmoreschooldistrict.net', 
    '570-207-9572', 
    2
),
(
    'Harper Collins', 
    'Keystone Industrial Scranton, PA 18509', 
    'harpercollins.en.cs@digitalriver.com', 
    '570-941-1500', 
    3
),
(
    'Bans Pet Grooming', 
    '393 Chestnut Blvd, Scranton PA, 18501', 
    'customerservice@bansgrooming.com', 
    '570-695-7382', 
    4
),
(
    'Haymont Tires', 
    '468 State St, Scranton PA, 18501', 
    'tires@haymont.com', 
    '570-704-2185', 
    5
);

-- Add sample data to the Products table
INSERT INTO Products (name, quantity, cost_per_unit)
VALUES 
(
    'A1', 1000, 5
),
(
    'A2', 1000, 6
),
(
    'A3', 2000, 7
),
(
    'A4', 1500, 10
),
(
    'A5', 1600, 9
);

-- Add sample data to the Orders table
INSERT INTO Orders (employee_id, customer_id, total_cost, date)
VALUES 
(
    2, 2, 1400, '2022-22-01'
),
(
    3, 3, 14000, '2022-03-24'
),
(
    2, 4, 900, '2023-01-01'
);

-- Add sample data to the Roles table
INSERT INTO Roles(role_name, base_salary)
VALUES 
(
    'Regional Manager', 100000
),
(
    'Sales Representative', 65000
),
(
    'Acountant', 50000
);

-- Add sample data to the Products_Ordered table
INSERT INTO Products_Ordered(order_id, product_id, quantity, cost_per_unit)
VALUES 
(
    1, 1, 100, 5
),
(
    1, 2, 150, 6
),
(
    2, 3, 200, 7
),
(
    3, 5, 100, 9
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;