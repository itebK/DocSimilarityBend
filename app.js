var express = require('express');
// Set up the express app
const app = express();

//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, '../DocSimilarity/src/assets/NLP_data/input_pdfs');

// get all files
app.get('/api/files', (req, res) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        res.status(200).send({
            success: 'true',
            message: 'files retrieved successfully',
            files: files
        })
    });


});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});