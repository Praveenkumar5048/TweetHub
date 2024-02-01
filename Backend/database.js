import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()

export async function getnotes(){
    const [rows] = await db.query("SELECT * FROM student_info")
    return rows;
}

export async function getnote(id){
    const [row] = await db.query(
        'SELECT * FROM student_info where student_id = ?', [id])
    return row;    
}

export async function createnote(student_id, first_name, last_name, age, major){
    const response = await db.query('INSERT INTO student_info (student_id, first_name, last_name, age, major) VALUES (?, ?, ?, ?, ?)',
    [student_id, first_name, last_name, age, major])
    return response;
}

