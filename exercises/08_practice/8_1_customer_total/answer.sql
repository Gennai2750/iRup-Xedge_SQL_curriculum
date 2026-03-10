SELECT e.employee_id, e.first_name, e.last_name, SUM(p.price * o.quantity) AS total_amount
FROM employees e
JOIN orders o ON e.employee_id = o.employee_id
JOIN products p ON o.product_id = p.product_id
GROUP BY e.employee_id, e.first_name, e.last_name
ORDER BY total_amount DESC;
