
//READ FILE - with call back function
// const fs = require('fs/promises');
// fs.readFile('./db/db.json', 'utf8', (error, data) => {
//     if (error) {
//         console.error(error);
//     } else {
//         console.log("data")
//         console.log(data);
//         res.send(JSON.stringify(data));
//     }
// } )

//READ & WRITE FILE - with promise object
const fs = require('fs').promises;
const readFile = fs.readFile
const writeFile = fs.writeFile;
//READ FILE = with util.promisify object
// const fs = require('fs');
// const util = require('util');
// const readFile = util.promisify(fs.readFile);

//APPEND FILE - promise object
const readAndAppend = (newNote, pathway) => {
  readFile(pathway, 'utf8')
  .then((data) => {
    const parsedData = JSON.parse(data);
      parsedData.push(newNote);
      writeFile(pathway, JSON.stringify(parsedData))
      .then((data) => console.log("User-input written and appended to list successfully"))
      .catch((error) => console.log(error));
      
  })
  .catch((error) => console.log(error));
};

//WRITE FILE - call back function
// const readAndAppend = (newNote, pathway) => {
//   fs.readFile(pathway, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const parsedData = JSON.parse(data);
//       parsedData.push(newNote);
//       fs.writeFile(pathway, JSON.stringify(parsedData), (err) => {
//         err ? console.error(err) : console.info(`Data written to ${pathway}`)
//       } )
//    }
//   });
// };

//DELETE - promise objects
const deleteItem = (parsedData, i) => {
  parsedData.splice(i,1)
  writeFile('./db/db.json', JSON.stringify(parsedData))
  .then((data) => console.log("List item deleted successfully from database"))
  .catch((error) => console.log(error))
  }
  
//DELETE - call back functions
// const deleteItem = (identification) => {
//     let idExists = false;
//     fs.readFile('./db/db.json', 'utf8', (err, data) => {
//       if (err) {
//         console.error(err);
//       } else {
//         const parsedData = JSON.parse(data);
//         for (let i = 0; i<parsedData.length; i++){
//             if (parsedData[i].id === identification){
//                 parsedData.splice(i,1)
//                 idExists = true;
//                 fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err) => {
//             err ? console.error(err) : console.info(`id deleted from db.json database`)
//                   } )
//             }
//         }
                
//       }
//     });
//   };


module.exports = {readFile, readAndAppend, deleteItem}