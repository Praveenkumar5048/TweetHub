import express from 'express';
import { getnotes, getnote, createnote } from './database.js';

const app = express();
app.use(express.json())
const port = 3000;

app.get("/getnotes", async (req, res) => {
  const response = await getnotes() ;
  res.send(response);
});

app.get("/getnote/:id", async (req, res) => {
    const id = req.params.id;
    const response = await getnote(id) ;
    res.send(response);
});

app.post("/createnote", async (req, res) => {
    const {student_id, first_name, last_name, age, major}  = req.body;
    const response = await createnote(student_id, first_name, last_name, age, major);
    res.status(201).send(response);
});



app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
