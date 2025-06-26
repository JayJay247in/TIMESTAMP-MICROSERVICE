// index.js
require('dotenv').config(); // To load environment variables from a .env file
const express = require('express');
const cors = require('cors');
const path = require('path'); // Node.js path module

const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});


// API endpoint for date processing
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;

  // If no date parameter is provided, use the current date
  if (!dateString) {
    date = new Date();
  } else {
    // Check if the dateString is a number (potential Unix timestamp in ms)
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      // Otherwise, try to parse it as a date string
      date = new Date(dateString);
    }
  }

  // Check if the parsed date is valid
  if (isNaN(date.getTime())) { // or date.toString() === "Invalid Date"
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),       // Unix timestamp in milliseconds
      utc: date.toUTCString()     // UTC date string
    });
  }
});


// Listen for requests
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});