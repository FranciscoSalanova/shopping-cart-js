CREATE DATABASE shopping_cart_js;
USE shopping_cart_js;

CREATE TABLE store_items(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    price_in_cents INT NOT NULL,
    image VARCHAR(255),
    PRIMARY KEY (id)
);
CREATE TABLE cart_items(
	id INT NOT NULL AUTO_INCREMENT,
    quantity INT NOT NULL,
    item_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (item_id) REFERENCES store_items(id)
);

INSERT INTO store_items (name, category, price_in_cents)
VALUES ("Ferrari 550 Maranello", "Cars", 1000000), ("Ferrari F430", "Cars", 2000000), ("Ferrari 458 Italia", "Cars", 3000000);
