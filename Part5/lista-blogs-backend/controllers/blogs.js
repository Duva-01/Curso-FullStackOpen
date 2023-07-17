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

    console.log("El usuario actual: " + user.username);
    console.log("El usuario del blog: " + blog.user.username);
    
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
  console.log("Me llega este blog:", request.body);
  const id = request.params.id;

  try {
    const blogToUpdate = await Blog.findById(id);

    if (!blogToUpdate) {
      console.log("No se encontró el blog con la ID:", id);
      return response.status(404).json({ error: 'No blog found with the given ID' });
    }

    const updatedBlog = {
      ...blogToUpdate.toJSON(),
      ...request.body,
      user: request.body.user
    };

    const updated = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });

    // Búsqueda del usuario por ID antes de enviar la respuesta
    const user = await User.findById(updated.user);
    if (!user) {
      console.log("No se encontró el usuario con la ID:", updated.user);
      return response.status(404).json({ error: 'No user found with the given ID' });
    }

    updated.user = user;  // Sustitución del ID del usuario por el objeto de usuario completo

    console.log("Envio este blog", updated);
    response.json(updated);
  } catch (error) {
    console.log("Hay un fallo con la id del blog");
    response.status(400).json({ error: 'Invalid blog id' });
  }
});




module.exports = blogsRouter;
