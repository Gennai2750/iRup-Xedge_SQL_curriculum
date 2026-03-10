SELECT first_name, last_name, salary,
    CASE
        WHEN salary >= 60000 THEN 'High'
        WHEN salary >= 50000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_level
FROM employees;
