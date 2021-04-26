// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const apiRoutes=require('./routing/api')


// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api',apiRoutes);


//HTML Routing
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    console.log("hello index")
});
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
    console.log("hello notes")
});





// LISTENER
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });