import express from 'express';

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("Server: now listening on port " + port)
});

app.get('/cookie', (req, res) => {

    res.type("text/plain");
    res.send("Hello, World!");
});
