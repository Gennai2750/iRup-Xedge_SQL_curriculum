SELECT d.department_name, e.first_name, e.last_name, e.salary,
    AVG(e.salary) OVER (PARTITION BY e.department_id) AS avg_salary
FROM employees e
JOIN departments d ON e.department_id = d.department_id;
