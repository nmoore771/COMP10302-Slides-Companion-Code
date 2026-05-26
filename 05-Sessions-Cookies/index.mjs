import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(session({
    secret : "CRYPTOGRAPHICALLY SECURE STRING",
    cookie : { maxAge : 300000
        , httpOnly : true
    }
}))

app.listen(port, () => {
    console.log("Server: now listening on port " + port)
});

app.get('/session/counter', (req, res) => {
    console.log(JSON.stringify(req.session));
    if (!('visits' in req.session)) {
        req.session.visits = 1;
    } else {
        req.session.visits += 1;
    }
    res.type("text/plain");
    res.send("You have visited this webpage " + req.session.visits+ " times!");
})

app.get('/session/regen', (req, res) => {
    console.log("regenerating session...")
    let session = req.session;
    req.session.regenerate((error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("session regenerated");
            req.session.visits = session.visits;
        }
        res.end();
    });
})

app.get('/session/destroy', (req, res) => {
    console.log("Ending Session...")
    req.session.destroy( (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("session destroyed!");
        }
        res.end();
    })
})

app.get('/cookie', (req, res) => {
    console.log(JSON.stringify(req.cookies))
    if (!('weather' in req.cookies)) {
        res.cookie('weather', 'mild',
            { maxAge : 100000
            , httpOnly : true
            , secure : true
            });
    }
    res.type("text/plain");
    res.send("Hello, Cookies!");
});
