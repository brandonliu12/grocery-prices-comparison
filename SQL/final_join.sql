CREATE TABLE joined_prices AS (
        SELECT 
            E.product_name AS product_name, 
            E.edmonton_price AS edmonton_price,
            O.ottowa_price AS ottowa_price, 
            T.toronto_price AS toronto_price, 
            V.vancouver_price AS vancouver_price
        FROM edmonton E
        JOIN ottowa O ON E.product_name = O.product_name
        JOIN toronto T ON E.product_name = T.product_name
        JOIN vancouver V ON E.product_name = V.product_name
    )