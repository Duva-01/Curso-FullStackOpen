const listHelper = require('../utils/list_helper');

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
];

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([blogs[0]]);
    expect(result).toBe(7);
  });

  test('when list has multiple blogs, equals the sum of likes', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('when list is empty, returns null', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBeNull();
  });

  test('when list has only one blog, returns that blog', () => {
    const favorite = {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    };

    const result = listHelper.favoriteBlog([favorite]);
    expect(result).toEqual({
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes,
    });
  });

  test('when list has multiple blogs, returns the one with most likes', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

const request = require('supertest');
const app = require('../app');

describe('blogs API', () => {
  test('returns correct number of blogs in JSON format', async () => {
    const response = await request(app)
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/)
      .expect(200);

    expect(response.body).toHaveLength(blogs.length);
  });

  test('blog has id property instead of _id', async () => {
    const response = await request(app)
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/)
      .expect(200);

    const blogs = response.body;
    blogs.forEach(blog => {
      expect(blog.id).toBeDefined();
      expect(blog._id).toBeUndefined();
    });
  });

  test('creates a new blog post', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'John Doe',
      url: 'http://testblog.com',
      likes: 10,
    };

    const response = await request(app)
      .post('/api/blogs')
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(201);

    expect(response.body.title).toBe(newBlog.title);
    expect(response.body.author).toBe(newBlog.author);
    expect(response.body.url).toBe(newBlog.url);
    expect(response.body.likes).toBe(newBlog.likes);

    const updatedResponse = await request(app)
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/)
      .expect(200);

    expect(updatedResponse.body).toHaveLength(blogs.length + 1);
  });

  test('sets likes to 0 if likes property is missing', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'John Doe',
      url: 'http://testblog.com',
    };

    const response = await request(app)
      .post('/api/blogs')
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(201);

    expect(response.body.likes).toBe(0);
  });

  test('returns 400 Bad Request if title and url properties are missing', async () => {
    const newBlog = {
      author: 'John Doe',
      likes: 5,
    };

    await request(app)
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });
});
