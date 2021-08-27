// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser')

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const host = "localhost:";
const port = app.listen(process.env.PORT || 5000);
// If the request is seccessful (status code 200) it send to the empty object
const getAll = (req, res) => res.status(200).send(projectData);
// GET Route
app.get("/all", getAll);


// Sends information from the user to the object
const postData = (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}
// POST Route
app.post("/add", postData);


/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on ${host} ${port}`);
  };