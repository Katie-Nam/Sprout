-- Create a new database
CREATE DATABASE task_manager;

-- Use the database
USE task_manager;

-- Create User table
CREATE TABLE User (
  id INT NOT NULL AUTO_INCREMENT,
  Email VARCHAR(255) NOT NULL UNIQUE,
  Name VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Create Tags table
CREATE TABLE Tags (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  color VARCHAR(7) DEFAULT '#FFFFFF',
  PRIMARY KEY (id)
);

-- Create Tasks table
CREATE TABLE Tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    checkbox BOOLEAN DEFAULT false,
    description VARCHAR(255) NOT NULL,
    tag VARCHAR(255),
    priority ENUM('!', '!!', '!!!') NOT NULL,
    dueDate DATETIME NOT NULL,
    reminder VARCHAR(255),
    FOREIGN KEY (tag) REFERENCES Tags(name)
);
