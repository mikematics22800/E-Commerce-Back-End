-- DROP DATABASE
DROP DATABASE IF EXISTS e_commerce_db;

-- CREATE DATABASE
CREATE DATABASE e_commerce_db;

CREATE TABLE category (
    id INT NOT NULL PRIMARY KEY SERIAL,
    category_name VARCHAR NOT NULL
);

CREATE TABLE product (
    id INT NOT NULL PRIMARY KEY SERIAL,
    product_name VARCHAR NOT NULL,
    price DECIMAL NOT NULL,
    stock INT NOT NULL DEFAULT 10,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES Category(id)
);

CREATE TABLE tag (
    id INT NOT NULL PRIMARY KEY SERIAL,
    tag_name VARCHAR NOT NULL
);

CREATE TABLE product_tag (
    id INT NOT NULL PRIMARY KEY SERIAL,
    product_id INT,
    tag_id INT,
    FOREIGN KEY (product_id) REFERENCES Product(id),
    FOREIGN KEY (tag_id) REFERENCES Tag(id)
);