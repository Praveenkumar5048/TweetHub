-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS SocialMediaApp;

-- Switch to the specified database
USE SocialMediaApp;

-- Create the Users table 
CREATE TABLE IF NOT EXISTS Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    bio TEXT,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

-- Create the Posts table
CREATE TABLE IF NOT EXISTS Posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    content TEXT,
    media_url VARCHAR(255),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create the Likes table
CREATE TABLE IF NOT EXISTS Likes (
    like_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    post_id INT,
    liked_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

-- Create the Comments table
CREATE TABLE IF NOT EXISTS Comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    post_id INT,
    content TEXT,
    commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

-- HashTag  Table
CREATE TABLE IF NOT EXISTS HashTag (
    hashTag_id INT AUTO_INCREMENT,
    hashTag_name VARCHAR(255),
    post_id INT,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
) 

