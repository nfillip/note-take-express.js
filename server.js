const express = require('express');
const path = require('path');
const api = require('./routes/index');
const PORT = 3001;
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api', api);

//GETS
app.get('/notes', (req,res) => {
    console.log(`${req.method} received to send to notes.html`);
    res.sendFile(path.join(__dirname, '/public/notes.html'))
    
})


app.get('*', (req,res) => {
    console.log(`${req.method} received to send to index.html`);
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//LISTEN
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})