CREATE DATABASE shopping_cart_js;
USE shopping_cart_js;

CREATE TABLE store_items(
	id INT,
    name VARCHAR(255),
    category VARCHAR(255),
    price_in_cents INT,
    image VARCHAR(255)
);
CREATE TABLE cart_items(
	id INT,
    quantity INT
);