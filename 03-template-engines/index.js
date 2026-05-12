
import express from 'express';
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

