
import express from 'express';
import { readFile } from 'fs';
import { engine } from 'express-handlebars';

const app = express();
const port = 3000;

// setting up handlebars
app.engine('hbs', engine({ defaultLayout: "" }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.listen(port, () => {
    console.log("Server: now listening on port " + port)
});

app.get('/hello', (req, res) => {
    res.render('hello', {
        hello : "Hello, World!"
    })
})

app.get('/planets', (req, res) => {
    readFile('data/solar-system.json', (err, data) => {
       if (err) {
           res.status(500);
           res.end("Error! Could not find internal data file!");
       } else {
           const ss = JSON.parse(data);
           res.status(200);
           res.render('planets', {planets : ss.solarSystem.planets});
       }
    });
})

app.get('/planet/:name', (req, res) => {
    readFile('data/solar-system.json', (err, data) => {
        if (err) {
            res.status(500);
            res.end("Error! Could not find internal data file!");
        } else {
            const ss = JSON.parse(data);
            let TPL =
                { found : false
                , planet : { name : req.params.name }
                };
            for (let i = 0; i < ss.solarSystem.planets.length; i++ ) {
                let planet = ss.solarSystem.planets[i];
                if (planet.name == req.params.name) {
                    TPL.planet = planet;
                    TPL.found = true;
                    break;
                }
            }
            console.log(TPL);
            res.status(200);
            res.render('planet', TPL);
        }
    });
})
