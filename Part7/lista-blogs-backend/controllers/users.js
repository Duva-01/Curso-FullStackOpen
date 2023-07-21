const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');

usersRouter.get('/', async (request, response) => {

  console.log("Me llega peticion");

  const users = await User.find({}).populate('blogs', 'title author');
  response.json(users);
});

usersRouter.post('/', async (request, response) => {

  console.log("Me meto correctamente en el create de usuario")

  const { username, password, name } = request.body;

  if (!username || !password) {
    return response.status(400).json({ error: 'Username and password are required' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
    name
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
