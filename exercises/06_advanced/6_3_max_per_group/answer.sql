SELECT e.first_name, e.last_name, e.department_id, e.salary
FROM employees e
WHERE e.salary = (
    SELECT MAX(e2.salary) FROM employees e2 WHERE e2.department_id = e.department_id
);
