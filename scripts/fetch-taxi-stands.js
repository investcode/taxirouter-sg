'use strict';

const https = require('https');
const fs = require('fs');

https.get('https://s3-ap-southeast-1.amazonaws.com/taxi-taxi/prod/share/taxi_stands.csv', (res) => {
  let body = '', data = [];
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    body.split(/[\n\r]/).forEach((line) => {
      if (!line) return;
      let d = line.split(',');
      data.push([parseFloat(d[1], 10), parseFloat(d[2], 10)]);
    });
    console.log('Taxi stands count: ' + data.length);

    const dataFilePath = 'data/taxi-stands.json';
    fs.writeFile(dataFilePath, JSON.stringify(data), (e) => {
      if (e) throw e;
      console.log(dataFilePath + ' generated.');
    });
  });
})
