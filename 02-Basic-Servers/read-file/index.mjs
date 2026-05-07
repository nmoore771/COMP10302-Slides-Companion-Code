import express from 'express';
import { readFile } from 'fs';

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
