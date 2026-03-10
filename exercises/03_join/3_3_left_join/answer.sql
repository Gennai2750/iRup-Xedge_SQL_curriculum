SELECT d.department_name, e.first_name, e.last_name FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id;
