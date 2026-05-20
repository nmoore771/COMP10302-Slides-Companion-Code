import express from 'express';
import { getGames, upvote, addGame /*, deleteGame*/ } from './models/game-operations.mjs'

const app = express();
const port = 3000;

// Setting up middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('./public'));

//redirect '/' to index.html
app.get('/', (req, res) => {
    console.log("redirecting to index page...")
    res.redirect("/index.html");
})

// Create via various methods
app.post('/games', async (req, res) => {
    const context = { error : null };
    if (Object.keys(req.query).length > 0) {
        context.newGame = req.query;
    } else {
        context.newGame = req.body;
    }
    // attempt adding game
    await addGame(context);
    // send response!
    res.status( (context.error)? 500 : 201 );
    res.end();
})

// Read
app.get('/games', async (req, res) => {
    console.log("Acquiring data...")
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
    console.log("upvoting game " + req.params.id);
    const context = { error : null };
    await upvote(context, req.params.id);
    res.status( (context.error)? 404 : 204 );
    res.end();
})

// Destroy
/* Your code here! */

app.listen(port, () => {
    console.log("Server: now listening on port " + port)
});