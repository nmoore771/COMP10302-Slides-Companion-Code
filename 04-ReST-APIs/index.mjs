import express from 'express';
import bodyParser from "body-parser";
import { getGames, upvote, addGame, deleteGame } from './models/game-operations.mjs'
import {readFile} from "fs";

const app = express();
const port = 3000;

// Setting up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.listen(port, () => {
    console.log("Server: now listening on port " + port)
});

//redirect '/' to index.html
app.get('/', (req, res) => {
    res.redirect("/index.html");
})

// Create via QUERY params
app.post('/games', async (req, res) => {
    console.log(req.query);
    const context = { error : null };
    // attempt adding game
    await addGame(context, req.query.name, req.query.genre, req.query.platform);
    // send response!
    res.status( (context.error)? 500 : 201 );
    res.end();
})

// Create via JSON body
app.post('/games', async (req, res) => {
    console.log(req.body);
    const context = { error : null };
    // attempt adding game
    await addGame(context, req.body.name, req.body.genre, req.body.platform);
    // send response!
    res.status( (context.error)? 500 : 201 );
    res.end();
})

// Create via POST params
app.post('/games', async (req, res) => {
    console.log(req.body);
    const context = { error : null };
    // attempt adding game
    await addGame(context, req.query.name, req.query.genre, req.query.platform);
    // send response!
    res.status( (context.error)? 500 : 201 );
    res.end();
})


// Read
app.get('/games', async (req, res) => {
    // set up context object
    const context = { error : null, games : [] };
    // acquire data
     await getGames(context);
    // set return status
    res.status( (context.error)? 500 : 200 );
    // send the games!
    res.json(context);
});

// Update
app.put('/games/:id', async (req,res) => {
    const context = { error : null };
    await upvote(context, req.params.id);
    res.status( (context.error)? 404 : 202 );
    res.end();
})

// Destroy
app.delete('games/:id', async (req, res) => {
    const context = { error : null };
    await deleteGame(context, req.params.id);
    res.status( (context.error)? 404 : 202 );
    res.end();
});