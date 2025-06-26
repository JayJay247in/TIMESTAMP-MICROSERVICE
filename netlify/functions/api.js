// netlify/functions/api.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const serverless = require('serverless-http');

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

// Get the current working directory of the Lambda function environment
const functionExecutionRoot = process.cwd(); // This is usually /var/task/

// Serve static files assuming 'public' is at the root of the deployed package
const publicPath = path.join(functionExecutionRoot, 'public');
console.log("Serving static files from:", publicPath);
app.use(express.static(publicPath));

app.get("/", function (req, res) {
  const filePath = path.join(functionExecutionRoot, 'views/index.html');
  console.log("Attempting to send file:", filePath);
  res.sendFile(filePath, (err) => {
    if (err) {
        console.error("Error sending file:", filePath, err);
        res.status(404).send(`Error: Could not load the page. File not found at ${filePath}. ENOENT code: ${err.code}`);
    }
  });
});

// Your API endpoint for date processing
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;

  if (!dateString) {
    date = new Date();
  } else {
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Catch-all for any other API routes
app.get("/api/*", (req, res) => {
    res.status(404).json({ error: "API route not found" });
});

module.exports.handler = serverless(app);