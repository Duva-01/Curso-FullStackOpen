const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

const mongoUrl = 'mongodb://127.0.0.1:27017/bloglist';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter); 

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

app.use((request, response, next) => {
  const token = getTokenFrom(request);

  console.log("Token app.js: " + token)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (decodedToken) {
      request.token = token; 
      request.user = decodedToken;
    }
  } catch (error) {
    // Token inválido o expirado
  }

  next();
});



if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

module.exports = app;
