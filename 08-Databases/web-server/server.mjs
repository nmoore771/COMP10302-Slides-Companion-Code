import express from 'express';
import { add, get, remove, getAll } from "./models/database.mjs";

const app = express();
const port = 3000;

app.get('/api/books', async (req,res) => {
    let books = await getAll();
    res.json(books);
})

app.get('/api/books/:id', async (req,res) => {
    let book = await get(req.params.id);
    console.log(book);
    res.json(book);
})

app.listen(port, () => {
    console.log("Server: now listening on port " + port)
});