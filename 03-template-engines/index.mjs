
import express from 'express';
import { readFile } from 'fs';
import { engine } from 'express-handlebars';
import { searchPlanet } from './models/search.model.mjs'

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
           res.render('planets-table', {planets : ss.solarSystem.planets});
       }
    });
})

app.get('/planet/:name', async (req, res) => {
    // set up template array
    const TPL = {
        error : null,
        found : false,
        planet : null,
    }

    // invoke the model relevant model function
    await searchPlanet(req.params.name, TPL);

    // call the relevant view
    if (TPL.error) {
        res.status(500);
        res.end("Error! Could not find internal data file!");
    } else {
        res.status(404);
        res.end("Error! No record of planet!")
    }
});

/* Routing rule without MVC Architecture.

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
})*/
