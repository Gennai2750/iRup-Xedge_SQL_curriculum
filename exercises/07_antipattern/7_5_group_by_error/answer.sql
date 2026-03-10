SELECT department_id, COUNT(*) AS employee_count, AVG(salary) AS avg_salary FROM employees GROUP BY department_id;
