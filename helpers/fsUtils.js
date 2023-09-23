// const fs = require('fs/promises');


//callback FS
// fs.readFile('./db/db.json', 'utf8', (error, data) => {
//     if (error) {
//         console.error(error);
//     } else {
//         console.log("data")
//         console.log(data);
//         res.send(JSON.stringify(data));
//     }
// } )


//PROMISE FS
// const fs = require('node:fs/promises');
// const readFile = (pathway) => {
// fs.readFile(pathway, 'utf-8')
// .then((data) => {
//     console.log('promise/fs worked')
//     console.log(data)
//     return JSON.stringify(data);
// })
// .catch((error) => console.log(error))
// }

// const readAndAppend = () => {

// }

//PROMISE FS 1.0
//READ FILE
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
**/

//CB - WRITE FILE
const readAndAppend = (newNote, pathway) => {
  fs.readFile(pathway, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(newNote);
      fs.writeFile(pathway, JSON.stringify(parsedData), (err) => {
        err ? console.error(err) : console.info(`Data written to ${pathway}`)
      } )

      
      
    }
  });
};

//DELETE
const deleteItem = (identification) => {
    let idExists = false;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        for (let i = 0; i<parsedData.length; i++){
            if (parsedData[i].id === identification){
                parsedData.splice(i,1)
                idExists = true;
                fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err) => {
            err ? console.error(err) : console.info(`id deleted from db.json database`)
                  } )
            }
        }
                
      }
    });
  };


module.exports = {readFile, readAndAppend, deleteItem}