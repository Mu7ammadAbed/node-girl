const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

const router = (req, res) => {
  const endpoint = req.url;
  if (endpoint === "/") {
    const filePath = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(filePath, (err, file) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "Text/html" });
        res.write("500 Internal Server Error");
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "Text/html" });
        res.write(file);
        res.end();
      }
    });
  } else if (endpoint.includes("public")) {
    const filePath = path.join(__dirname, "..", ...endpoint.split("/"));
    const fileType = endpoint.split(".")[1];
    const MimeTypes = {
      css: "text/css",
      jpg: "image/jpeg",
      js: "application/javascript",
    };
    fs.readFile(filePath, (err, file) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "Text/html" });
        res.write("<h1>500 Internal Server Error</h1>");
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": MimeTypes[fileType] });
        res.write(file);
        res.end();
      }
    });
  } else if (endpoint === "/create-post") {
    let allData = "";
    req.on("data", (chunkOfData) => {
      allData += chunkOfData;
    });
    req.on("end", () => {
      const convertedData = querystring.parse(allData);
      console.log(convertedData);
      res.writeHead(302, { Location: "/" });
      res.end();
    });
  } else if (endpoint === "/node") {
    res.writeHead(200, { "Content-Type": "Text/html" });
    res.write(message);
    res.end();
  } else if (endpoint === "/girls") {
    res.writeHead(200, { "Content-Type": "Text/html" });
    res.write("girls");
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "Text/html" });
    res.write("<h1>Error 404: Page Not Found!</h1>");
    res.end();
  }
};

module.exports = router;
