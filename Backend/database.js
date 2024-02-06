import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Create a single pool and reuse it
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

export async function getUsers() {
    const [rows] = await db.query('SELECT * FROM Users');
    return rows;
}

export async function getPosts() {
    const [rows] = await db.query('SELECT * FROM Posts');
    return rows;
}

export async function getLikes() {
    const [rows] = await db.query('SELECT * FROM Likes');
    return rows;
}

export async function getComments() {
    const [rows] = await db.query('SELECT * FROM Comments');
    return rows;
}
