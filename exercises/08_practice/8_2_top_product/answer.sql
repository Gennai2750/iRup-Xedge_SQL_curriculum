SELECT p.product_id, p.product_name, SUM(p.price * o.quantity) AS total_sales
FROM products p
JOIN orders o ON p.product_id = o.product_id
GROUP BY p.product_id, p.product_name
ORDER BY total_sales DESC
LIMIT 1;
