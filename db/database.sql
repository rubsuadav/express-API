CREATE DATABASE IF NOT EXISTS db;

USE db;

CREATE TABLE
  IF NOT EXISTS users (
    id int (11) NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

DESCRIBE users;

INSERT INTO
  users (username, password, email)
VALUES
  ('admin', 'admin', 'admin@gmail.com'),
  ('user', 'user', 'user@gmail.com');