// Dependencies
const express = require('express');
const path = require('path');
const notes= require ('./db/db.json');


// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//HTML Routing
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    console.log("hello index")
});
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
    console.log("hello notes")
});




//API Routing
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = 2;
    notes.push(newNote);
    return res.json(newNote);
})

app.get('/api/notes', (req, res) => res.json(notes));

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    for(var i=0; i<notes.length; i++){
        if(notes[i].id == id) {
            notes.splice(i,1);
            break;
        }
    }
    return res.json(notes)
})






// LISTENER
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });