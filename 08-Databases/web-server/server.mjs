import express from 'express';
import { add, get, remove, getAll } from "./models/database.mjs";


const app = express();
const port = 3000;

// middleware
app.use(express.json());

app.get('/api/books', async (req,res) => {
    let books = await getAll();
    res.json(books);
})

app.get('/api/books/:id', async (req,res) => {
    let book = await get(req.params.id);
    res.json(book);
})

app.delete('/api/books/:id', async (req,res) => {
   let result = await remove(req.params.id);
   res.send(result);
});

app.post('/api/books/', async (req,res) => {
    let result = await remove(req.body)
    res.send(result);
})

app.listen(port, () => {
    console.log("Server: now listening on port " + port)
});