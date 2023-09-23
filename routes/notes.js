const notes = require('express').Router();
const fs = require('fs');
const dataTerm = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const {readFile,readAndAppend, deleteItem} = require('../helpers/fsUtils');

notes.get('/', (req,res) => {
    console.log(`${req.method} request received to read the db.json file and return all saved notes as JSON`);
    readFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))
    });
    
    });
    


notes.post('/', (req,res) => {
    console.log(`${req.method} request received to save new note on request.body and add it to db.json file. Then return new note to client. Each file needs a unique id.`);
    const newNote = req.body;
    const {title, text} = req.body;
    const appendNote = {
        title, 
        text,
        id: uuidv4(),
    };
    console.log(newNote)
    // readAndAppend(newNote, './db/db.json').then((data) => {
    //    res.json(newNote) 
    // })
    readAndAppend(appendNote, './db/db.json')
    res.json(newNote);
    
   
})

notes.delete('/:identification', (req,res) => {
    console.log(`${req.method} request received to delete specific id`);
    const item = req.params.identification;
    deleteItem(item);
   
    

})
module.exports = notes;