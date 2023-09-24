const express = require('express');
const path = require('path');
const api = require('./routes/index');
const PORT = 3001;
const app = express();
const { clog } = require('./middleware/clog');

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api', api);
app.use(clog);

//GETS
app.get('/notes', (req,res) => {
    
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