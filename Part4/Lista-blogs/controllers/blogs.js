const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', 'username name');
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  console.log('Token:', request.token);
  // Obtener el token del encabezado de autorización
  const token = getTokenFrom(request);

  try {
    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }

    // Buscar al usuario actual en la base de datos
    const user = await User.findById(decodedToken.id);

    // Crear un nuevo blog con el usuario actual como creador
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id, // Asignar el ID del usuario actual como creador del blog
    });

    const savedBlog = await blog.save();

    // Agregar el blog a los blogs del usuario actual
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(400).json({ error: 'Invalid token' });
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  try {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    response.status(400).json({ error: 'Invalid blog id' });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const updatedBlog = request.body;

  try {
    const updated = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
    response.json(updated);
  } catch (error) {
    response.status(400).json({ error: 'Invalid blog id' });
  }
});

module.exports = blogsRouter;
