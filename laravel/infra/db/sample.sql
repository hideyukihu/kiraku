select * from laravel.purchases;

SELECT
    id,
    quantity,
    plan_id,
    `date`,
    created_at,
    updated_at
FROM laravel.purchases;

SELECT SUM(quantity)
from laravel.purchases p
where plan_id = 1
GROUP BY quantity;

SELECT
    id,
    quantity,
    plan_id,
    `date`
FROM laravel.purchases
where plan_id = 1;

SELECT
    SUM(
        DATEDIFF(t1.`date`, t2.`date`)	
        
    ) AS total_difference		
FROM (
        SELECT `date`, (
                SELECT MAX(`date`)
                FROM laravel.purchases
                WHERE plan_id = 1
            ) AS max_date
        FROM laravel.purchases
        WHERE plan_id = 1
        ORDER BY `date` DESC
    ) AS t1
    JOIN (
        SELECT `date`, (
                SELECT MAX(`date`)
                FROM laravel.purchases
                WHERE plan_id = 1
            ) AS max_date
        FROM laravel.purchases
        WHERE plan_id = 1
        ORDER BY
            `date` DESC
    ) AS t2 ON t1.`date` > t2.`date`
WHERE t1.`date` = t1.max_date;



SELECT DATEDIFF(MAX(`date`), MIN(`date`)) + 1 AS total_days
FROM laravel.purchases
WHERE plan_id = 1
