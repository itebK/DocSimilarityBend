var express = require('express');
// Set up the express app
const app = express();
const pdf2html = require('pdf2html')
//requiring path and fs modules
const path = require('path');
const fs = require('fs');

//joining path of directory 
const directoryPath = path.join(__dirname, '../DocSimilarity/src/assets/NLP_data/input_pdfs');

//joining path of files 
const filePathJson = path.join(__dirname, '../DocSimilarity/src/assets/NLP_data/cleaned_text.json');
const refsPathJson = path.join(__dirname, '../DocSimilarity/src/assets/NLP_data/cleaned_refs.json');


//get file by name
app.get('/api/file/:name', (req, res) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    var name = req.params.name;
    var path = require('path');     
    var file = path.join(directoryPath, name);    
    res.download(file, function (err) {
           if (err) {
               console.log("Error");
               console.log(err);
           } else {
               console.log("Success");
           }    
    });

});


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



// get json text 
app.get('/api/text', (req, res) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
 
    //passsing filePath and callback function
    fs.readFile(filePathJson, function (err, text) {
        //handling error
        if (err) {
            return console.log('Unable to read file: ' + err);
        }
        res.status(200).send({
            success: 'true',
            message: 'text retrieved successfully',
            text: JSON.parse(text)
        })
    });


});



// get json refs 
app.get('/api/refs', (req, res) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
 
    //passsing filePath and callback function
    fs.readFile(refsPathJson, function (err, refs) {
        //handling error
        if (err) {
            return console.log('Unable to read file: ' + err);
        }
        res.status(200).send({
            success: 'true',
            message: 'refs retrieved successfully',
            refs: JSON.parse(refs)
        })
    });


});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});