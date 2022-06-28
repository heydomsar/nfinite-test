// import express from 'express'
import cors from 'cors';

// const app = express()

// app.use(cors())

// app.get('/', (req, res) => {
//   res.send('This is from express.js')
// })

const express = require('express'),
  app = express(),
  upload = require('express-fileupload'),
  csvtojson = require('csvtojson');

let csvData = '';

app.use(cors());
app.use(upload());

app.post('/upload', (req, res) => {
  /** convert req buffer into csv string **/
  csvData = req.files.csvfile.data.toString('utf8');
  return csvtojson({ delimiter: ';' })
    .fromString(csvData)
    .then((json) => {
      return res.status(201).json({ csv: csvData, json: json });
    });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server started on port ${port}: http://localhost:${port}`);
});
