import express from 'express';
import { createServer } from "https";
import { readFileSync } from 'fs';
import { add, get, remove, getAll } from "./models/database.mjs";

const options = {
    key : readFileSync('./keys/localhost.key'),
    cert : readFileSync('./keys/localhost.cert')
};

const app = express();
const port = 3000;
const server = createServer(options, app);

app.get('/', (req,res) => {
    res.send("Secure Hello World!");
})

server.listen(port, () => console.log("Now securely listening on port " + port ));

// middleware
/*app.use(express.json());

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
})*/

