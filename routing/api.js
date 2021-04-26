const router=require('express').Router();
const fs=require('fs');
const notes=require('../db/db.json');
const path = require('path');
const { uuid } = require('uuidv4');

// //API Routing
router.get('/notes', (req, res) =>{
    // let allnotes=fs.readFileSync(path.join(__dirname,'/../db/db.json'),'utf8');
    // console.log(allnotes);
    return res.json(notes)
});

router.post('/notes', (req, res) => {
    const newNote = req.body;
    let allnotes=fs.readFileSync(path.join(__dirname,'/../db/db.json'),'utf8');
    newNote.id = uuid();
    allnotes = JSON.parse(allnotes)
    allnotes.push(newNote);
    fs.writeFileSync(path.join(__dirname,'/../db/db.json'),JSON.stringify(allnotes));
    return res.json(allnotes);
})


router.delete('/notes/:id', (req, res) => {
    const id = req.params.id
    let newNotes=notes;
    for(var i=0; i<newNotes.length; i++){
        if(newNotes[i].id == id) {
            newNotes.splice(i,1);
            break;
        }
    }
    fs.writeFileSync(path.join(__dirname,'/../db/db.json'),JSON.stringify(newNotes));
    return res.json(notes)
})
module.exports=router;