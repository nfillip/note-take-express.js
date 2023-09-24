//VARIABLES
const notes = require('express').Router();
//random id generator
const { v4: uuidv4 } = require('uuid');
//uses fs-promise
const {readFile,readAndAppend, deleteItem} = require('../helpers/fsUtils');

//GET request
//http://localhost:3001/api/notes
notes.get('/', (req,res) => {
    console.log(`${req.method} request received to read the db.json file and return all saved notes as JSON`);
    readFile('./db/db.json', 'utf-8')
    .then((data) => {
        res.json(JSON.parse(data))
        
    })
    .catch((error) => console.log(error));
    });
    

//POST request
//http://localhost:3001/api/notes
notes.post('/', (req,res) => {
    console.log(`${req.method} request received to save new note on request.body and add it to db.json file. Then return new note to client. Each file needs a unique id.`);
    const newNote = req.body;
    const {title, text} = req.body;
    if(title && text){
        const appendNote = {
            title, 
            text,
            id: uuidv4(),
        };
        readAndAppend(appendNote, './db/db.json')
        res.json(newNote);
    } else {
        console.log("need keys of 'title' and 'text'");
        res.json("need keys of 'title' and 'text'")
    }
    
    
   
})

//http://localhost:3001/api/notes/{user input ID #}
notes.delete('/:identification', (req,res) => {
    let idExists = false;
    console.log(`${req.method} request received to delete specific id`);
    const item = req.params.identification;
    readFile('./db/db.json', 'utf-8')
    .then((data) => {
        const parsedData = JSON.parse(data)
        for (let i = 0; i<parsedData.length; i++){
            if (parsedData[i].id === item){
                idExists = true;
                deleteItem(parsedData, i)
            }
        }
        if (idExists) {
            res.json(`ID: ${item} deleted successfully`)
            console.log(`ID: ${item} deleted successfully`)
        } else{ 
            res.json(`ID: ${item} does not exist`)
            console.log(`ID: ${item} does not exist`)
        };
    })
    .catch((error) => console.log(error));
    });

// EXPORTS
module.exports = notes;