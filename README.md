# Timestamp Microservice API

This is a simple API project created as a solution for the freeCodeCamp "Timestamp Microservice" challenge. It provides endpoints to convert date strings or Unix timestamps (in milliseconds) into a JSON object containing both the Unix timestamp and a UTC date string.

## User Stories Implemented

1.  A request to `/api/:date?` with a valid date should return a JSON object with a `unix` key that is a Unix timestamp of the input date in milliseconds (as type Number).
2.  A request to `/api/:date?` with a valid date should return a JSON object with a `utc` key that is a string of the input date in the format: `Thu, 01 Jan 1970 00:00:00 GMT`.
3.  A request to `/api/1451001600000` should return `{ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }`.
4.  The project can handle dates that can be successfully parsed by `new Date(date_string)`.
5.  If the input date string is invalid, the API returns an object having the structure `{ error : "Invalid Date" }`.
6.  An empty date parameter (`/api/`) should return the current time in a JSON object with a `unix` key.
7.  An empty date parameter (`/api/`) should return the current time in a JSON object with a `utc` key.

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **Middleware:**
    *   `cors`: For enabling Cross-Origin Resource Sharing.
    *   `dotenv`: For managing environment variables.
*   **Serving Static Files:** Express.js `static` middleware.
*   **Templating/Views:** Basic HTML (`views/index.html`) served by Express.

## Project Structure

.
├── public/
│ └── style.css # Basic CSS for the landing page
├── views/
│ └── index.html # Landing page with API usage instructions
├── .env # Environment variables (PORT) - Not committed to Git
├── .gitignore
├── index.js # Main Express server logic
├── package-lock.json
├── package.json
└── README.md # This file


## Setup and Installation

1.  **Clone the repository (if applicable):**
    ```bash
    git clone https://github.com/JayJay247in/TIMESTAMP-MICROSERVICE.git
    cd timestamp-microservice
    ```
    Or ensure you have the project files as provided by the freeCodeCamp boilerplate.

2.  **Install dependencies:**
    Navigate to the project's root directory in your terminal and run:
    ```bash
    npm install
    ```

3.  **Create Environment Variables File:**
    Create a `.env` file in the root of your project (or rename `sample.env` if provided). Add the following:
    ```env
    PORT=3000
    ```
    You can change `3000` to any port you prefer.

    **Note:** Add `.env` to your `.gitignore` file to prevent committing sensitive information.

## Running the Application Locally

1.  Ensure all dependencies are installed (`npm install`).
2.  Start the Node.js/Express server from the project's root directory:
    ```bash
    npm start
    ```
    (This command uses the `start` script defined in `package.json`, which typically runs `node index.js`.)
    Alternatively, you can run:
    ```bash
    node index.js
    ```

The server should now be running on the port specified in your `.env` file (e.g., `http://localhost:3000`). Visiting this URL in your browser will display the `views/index.html` page.

## API Endpoints

### 1. Process a Date String or Timestamp

*   **Endpoint:** `GET /api/:date_string?`
*   **Description:**
    *   If `:date_string` is a valid date string (e.g., "2015-12-25", "December 25, 2015") or a Unix timestamp in milliseconds (e.g., "1451001600000"), it returns a JSON object with the Unix timestamp and the UTC date string.
    *   If `:date_string` is invalid, it returns a JSON object with an error message.
*   **Example Usages:**
    *   `GET /api/2015-12-25`
    *   `GET /api/1451001600000`
    *   `GET /api/December%2025,%202015` (URL encoded)
*   **Success Response (200 OK):**
    ```json
    {
      "unix": 1451001600000,
      "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
    }
    ```
*   **Error Response (Invalid Date):**
    ```json
    {
      "error": "Invalid Date"
    }
    ```

### 2. Get Current Time

*   **Endpoint:** `GET /api/` (i.e., the date parameter is empty)
*   **Description:** Returns a JSON object with the current Unix timestamp and the current UTC date string.
*   **Example Usage:**
    *   `GET /api/`
*   **Success Response (200 OK):**
    ```json
    {
      "unix": 1678886400000, // Example timestamp, will be current
      "utc": "Wed, 15 Mar 2023 12:00:00 GMT" // Example UTC, will be current
    }
    ```

### 3. Root Endpoint (Landing Page)

*   **Endpoint:** `GET /`
*   **Description:** Serves the `views/index.html` page, which provides information about the API and usage examples.

## Deployment

This application can be deployed to various cloud platforms that support Node.js (e.g., Heroku, Vercel, Render, Glitch, Replit).
When deploying:
*   Ensure your Node.js version is compatible with the platform.
*   Set the `PORT` environment variable in your hosting platform's settings dashboard if it doesn't automatically detect it or assign one.