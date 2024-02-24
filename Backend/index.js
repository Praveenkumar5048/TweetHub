import express from 'express';
import { getUsers, getPosts, getLikes, getComments } from './database.js';  // Adjust the path if needed

const app = express();
app.use(express.json());
const port = 8080;

app.get('/users', async (req, res) => {
    const response = await getUsers();
    res.send(response);
});

app.get('/posts', async (req, res) => {
    const response = await getPosts();
    res.send(response);
});

app.get('/likes', async (req, res) => {
    const response = await getLikes();
    res.send(response);
});

app.get('/comments', async (req, res) => {
    const response = await getComments();
    res.send(response);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
