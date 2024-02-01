-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS College;

-- Switch to the specified database
USE student;

-- Create the student_info table if it doesn't exist
CREATE TABLE IF NOT EXISTS Fuels (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    age INT,
    major VARCHAR(255)
);
