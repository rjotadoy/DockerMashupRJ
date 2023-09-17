const express = require('express') // express js for building web app
const cors = require('cors') // cors for enabling cross-origin resource sharing
const path = require('path') 
require('dotenv').config();
const app = express()
const PORT = process.env.PORT || 8000; // port on .env

// MIDDLEWARE CONFIGURATION
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// defining api routes
const flickrRouter = require('./routes/flickr');
const edamamRouter = require('./routes/edamam');
const openaiRouter = require('./routes/openai');
const pageCounterRouter = require('./routes/pagecounter');

// using api routes
app.use('/api/flickr', flickrRouter);
app.use('/api/edamam', edamamRouter);
app.use('/api/openai', openaiRouter);
app.use(pageCounterRouter);

// backend server with express 
// // route for api
// app.get("/api", (req, res) => {
//     res.json({"users": ["userOne", "userTwo", "userThree,", "userFour"] })
// })

// Serve static assets from the build folder
app.use(express.static(path.join(__dirname, 'build')));

// Handle React client-side routing by always returning the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, () => {console.log("Server started on port 8000")}) // server will run on port 8000