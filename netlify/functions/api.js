// netlify/functions/api.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const serverless = require('serverless-http');

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

// When files are included via included_files, they are typically available
// relative to the function's execution root, which is __dirname.
// The 'public' and 'views' folders will be at this root.
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
  // Log the path we are trying to send to confirm
  const filePath = path.join(__dirname, 'views/index.html');
  console.log("Attempting to send file:", filePath);
  res.sendFile(filePath, (err) => {
    if (err) {
        console.error("Error sending file:", err);
        // Send a more informative error if file not found in function
        res.status(500).send("Error: Could not load the page. File not found in function package.");
    }
  });
});

// Your API endpoint
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

app.get("/api/*", (req, res) => {
    res.status(404).json({ error: "API route not found" });
});

module.exports.handler = serverless(app);