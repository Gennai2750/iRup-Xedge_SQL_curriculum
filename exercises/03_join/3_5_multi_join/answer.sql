SELECT e.first_name, e.last_name, m.first_name AS manager_name FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;
