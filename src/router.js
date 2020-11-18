const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const router = (req, res) => {
  const endpoint = req.url;
  if (endpoint === '/') {
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    fs.readFile(filePath, (err, file) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'Text/html' });
        res.write('<h1> Error 500: Internal Server Error');
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'Text/html' });
        res.write(file);
        res.end();
      }
    });
  } else if (endpoint.includes('public')) {
    const filePath = path.join(__dirname, '..', ...endpoint.split('/'));
    const fileType = endpoint.split('.')[1];
    const MIMETypes = {
      css: 'text/css',
      js: 'application/js',
      jpg: 'image/jpeg',
      png: 'image/png',
      ico: 'image/x-icon',
    };
    fs.readFile(filePath, (err, file) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'Text/html' });
        res.write('<h1> Error 500: Internal Server Error');
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': MIMETypes[fileType] });
        res.write(file);
        res.end();
      }
    });
  } else if (endpoint === '/posts') {
    const filePath = path.join(__dirname, 'posts.json');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'Text/html' });
        res.write('<h1> Error 500: Internal Server Error');
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(data);
        res.end();
      }
    });
  } else if (endpoint === '/create-post') {
    let allTheData = '';
    req.on('data', (chunkOfData) => {
      allTheData += chunkOfData;
    });
    req.on('end', () => {
      const convertedData = querystring.parse(allTheData);
      res.writeHead(302, { Location: '/' });
      const filePath = path.join(__dirname, 'posts.json');
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'Text/html' });
          res.write('<h1> Error 500: Internal Server Error');
          res.end();
        } else {
          try {
            const timeStamp = Date.now();
            const newData = {};
            newData[timeStamp] = convertedData.post;
            const fullData = {
              ...JSON.parse(data),
              ...newData,
            };
            fs.writeFile(filePath, JSON.stringify(fullData), (error) => {
              if (error) {
                res.writeHead(500, { 'Content-Type': 'Text/html' });
                res.write('<h1> Error 500: Internal Server Error');
                res.end();
              } else {
                res.writeHead(302, { Location: '/' });
                res.end();
              }
            });
          } catch (error) {
            res.writeHead(500, { 'Content-Type': 'Text/html' });
            res.write('<h1> Error 500: Internal Server Error');
            res.end();
          }
        }
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'Text/html' });
    res.write('<h1> Error 404: Not Found!');
    res.end();
  }
};

module.exports = router;
