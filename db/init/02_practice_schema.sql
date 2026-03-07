CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(employee_id),
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER NOT NULL,
    order_date DATE NOT NULL
);

INSERT INTO products (product_name, price, category) VALUES
('Laptop', 120000, 'Electronics'),
('Mouse', 3000, 'Electronics'),
('Desk', 45000, 'Furniture'),
('Chair', 35000, 'Furniture'),
('Monitor', 60000, 'Electronics');

INSERT INTO orders (employee_id, product_id, quantity, order_date) VALUES
(1, 1, 1, '2024-01-15'),
(1, 2, 2, '2024-01-20'),
(2, 3, 1, '2024-02-10'),
(2, 5, 1, '2024-02-15'),
(3, 1, 1, '2024-03-01'),
(3, 4, 2, '2024-03-05'),
(4, 2, 3, '2024-03-10'),
(5, 5, 1, '2024-04-01');
