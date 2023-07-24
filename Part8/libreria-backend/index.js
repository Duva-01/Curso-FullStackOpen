const { ApolloServer, UserInputError, PubSub } = require('apollo-server-express');
const express = require('express');
const { v1: uuid } = require('uuid');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb://127.0.0.1:27017/'

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/users')

const jwt = require('jsonwebtoken');
const pubsub = new PubSub();
const DataLoader = require('dataloader');
const JWT_SECRET = 'pepe';
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Author {
  name: String!,
  id: ID!,
  born: Int,
  bookCount: Int!
}

type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

type Query {
  authorCount: Int!,
  bookCount: Int,
  allBooks(author: String, genre: String): [Book!]!,
  allAuthors: [Author!]!,
  me: User
}

type Mutation {
  addBook(
    title: String!,
    author: String!,
    published: Int!,
    genres: [String!]!
  ): Book,

  editAuthor(
    name: String!,
    setBornTo: Int!
  ): Author,

  createUser(
    username: String!
    favoriteGenre: String!
  ): User,

  login(
    username: String!
    password: String!
  ): Token
}

type Subscription {
  bookAdded: Book!
}

`

const resolvers = {
  Query: {
    authorCount: () => Author.countDocuments(),
    bookCount: () => Book.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        filter.author = author ? author._id : null;
      }

      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }

      return Book.find(filter).populate('author');
    },
    allAuthors: () => Author.find({}).populate('bookCount'),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Mutation: {
    addBook: async (root, args) => {

      if (args.title.length < 3) {
        throw new UserInputError('El título del libro debe tener al menos 3 caracteres', {
          invalidArgs: args,
        });
      }

      if (args.author.length < 3) {
        throw new UserInputError('El nombre del autor debe tener al menos 3 caracteres', {
          invalidArgs: args,
        });
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      const book = new Book({ ...args, author: author._id });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return Book.populate(book, 'author');
    },

    editAuthor: async (root, args) => {

      if (args.name.length < 3) {
        throw new UserInputError('El nombre del autor debe tener al menos 3 caracteres', {
          invalidArgs: args,
        });
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return user;
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'pepe') {
        throw new UserInputError('Wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },

  Author: {
    bookCount: async (root) => {
      const count = await Book.countDocuments({ author: root._id });
      return count;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};


const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);

      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`);
});