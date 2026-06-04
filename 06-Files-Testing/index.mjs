import express from 'express';
import fileUpload from 'express-fileupload';
import { engine } from 'express-handlebars';
import crypto from 'crypto';
import mime from 'mime-types';
import fs from 'fs/promises';

const app = express();
const port = 3000;

app.use(fileUpload({ maxSize : 5*1024*1024})); // 5 Megabytes
app.use('/uploads', express.static('uploads'));
app.engine('hbs', engine({ defaultLayout: "" }));
app.set('view engine', 'hbs');
app.set('views', './views');

const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];

app.post('/upload', (req, res) => {
    // Check if a file was even uploaded...
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400)
        res.end('No file was uploaded...');
        return;
    }
    let file = req.files.myFile;
    // Check for correct mime types.
    if (!acceptedTypes.includes(file.mimetype)) {
        res.status(415)
        res.end("Error! supported media types are jpeg, png, gif, webp and avif");
        return;
    }

    console.log("Received file : " + file.name);
    console.log("File Temporary Location : " + file.tempFilePath);
    let newFileName = crypto.randomBytes(16).toString('hex') + "." + mime.extension(file.mimetype);
    console.log("New File Name : " + newFileName);
    // write to the uploads directory!
    file.mv('uploads/' + newFileName, (err) => {
        if (err) {
            res.status(500).end(err);
        } else {
            res.end('File uploaded!');
        }
    });
});

app.get('/form', async (req, res) => {
   res.render('uploadForm', {});
});

app.get('/files', async (req,res) => {
    try {
        let filenames = await fs.readdir('uploads');
        let files = [];
        for (let i = 0; i < filenames.length; i++) {
            let newfile = {};
            newfile.name = filenames[i];
            let stats = await fs.stat("uploads/" + filenames[i]);
            newfile.size = stats.size;
            newfile.path = "uploads/" + newfile.name;
            files.push(newfile);
        }
        console.log(files);
        res.render('fileview', { files : files });
    } catch (err) {
        console.log(err);
        res.status(500)
        res.end(err.toString());
    }

});

app.get('/download/:file', (req,res) => {
    res.sendFile(req.params.file, { root : "./uploads" }, (err) => {
        if (err) {
            console.log(err);
            res.status(500).end("An internal error occured.");
        } else {
            res.status(200).end();
        }
    });
});

app.listen(port, () => {
    console.log("Server: now listening on port " + port)
});