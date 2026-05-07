import express from 'express';
import { readFile } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("Server: now listening on port " + port)
});

app.get('/', (req, res) => {
    res.type("text/plain");
    res.send("Hello, World!");
});

app.get('/splash', (req, res) => {
    console.log("Sending Welcome Page");
    readFile("public/welcome.html", (err, data) => {
        if (err) {
            res.status(404);
            res.end("File not found!");
        } else {
            res.type("text/html");
            res.status(200);
            res.end(data);
        }
    });
})
