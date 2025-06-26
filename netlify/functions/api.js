// netlify/functions/api.js
// No need for dotenv here as Netlify handles env vars
const express = require('express');
const cors = require('cors');
const path = require('path');
const serverless = require('serverless-http'); // Import serverless-http

const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors({ optionsSuccessStatus: 200 }));

// IMPORTANT: Adjust paths for serving static files from a serverless function context.
// __dirname in a Netlify function refers to the function's directory.
// We need to go up to the project root to find 'public' and 'views'.
const projectRoot = path.resolve(__dirname, '../../'); // Goes up from netlify/functions/api.js

app.use(express.static(path.join(projectRoot, 'public')));

app.get("/", function (req, res) {
  res.sendFile(path.join(projectRoot, 'views/index.html'));
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

// Catch-all for any other API routes you might add that are not /api/:date?
// If you only have the one above, this might not be strictly necessary.
app.get("/api/*", (req, res) => {
    res.status(404).json({ error: "API route not found" });
});


// Wrap the app with serverless-http and export the handler
module.exports.handler = serverless(app);

// DO NOT include app.listen() here.
// Netlify Functions are invoked by the platform, they don't listen on a port.