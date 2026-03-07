CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL
);

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    department_id INTEGER REFERENCES departments(department_id),
    salary INTEGER NOT NULL,
    manager_id INTEGER
);

INSERT INTO departments (department_name, location) VALUES
('HR', 'Building 1'),
('IT', 'Building 2'),
('Sales', 'Building 1'),
('Marketing', 'Building 3');

INSERT INTO employees (first_name, last_name, department_id, salary, manager_id) VALUES
('John', 'Doe', 1, 50000, NULL),
('Jane', 'Smith', 2, 60000, 1),
('Alice', 'Johnson', 2, 65000, 2),
('Bob', 'Brown', 3, 55000, 1),
('Charlie', 'Davis', 4, 70000, 1);
