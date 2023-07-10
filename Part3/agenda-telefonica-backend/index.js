const express = require('express');
const cors = require('cors')
const morgan = require('morgan');

const app = express();
app.use(cors())

// Configuración de Morgan

morgan.token('postData', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));


let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "Pepe",
    "number": "2344",
    "id": 5
  },
  {
    "name": "David",
    "number": "123444",
    "id": 6
  }
];

app.use(express.json());

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/info', (request, response) => {
  const date = new Date();
  const entryCount = persons.length;
  const html = `
    <div>
      <p>Date: ${date}</p>
      <p>Phonebook has info of: ${entryCount} people</p>
    </div>
  `;
  response.send(html);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: 'Missing name or number' });
  }

  if (persons.some(person => person.name === name)) {
    return response.status(400).json({ error: 'Name must be unique' });
  }

  const newPerson = {
    name,
    number,
    id: Math.floor(Math.random() * 10000)
  };

  persons.push(newPerson);

  response.json(newPerson);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
