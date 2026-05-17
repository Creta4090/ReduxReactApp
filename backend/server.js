const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const posts = [
  { id: '1', title: 'GraphQL Post 1', body: 'This is the first GraphQL post.' },
  { id: '2', title: 'GraphQL Post 2', body: 'This is the second GraphQL post.' },
  { id: '3', title: 'GraphQL Post 3', body: 'This is the third GraphQL post.' },
];

let contacts = [];

const schema = buildSchema(`
  type Post {
    id: ID!
    title: String!
    body: String!
  }

  type Contact {
    id: ID!
    name: String!
    email: String!
    mobileNumber: String!
    message: String!
    createdAt: String!
  }

  type Query {
    posts: [Post!]!
    contacts: [Contact!]!
  }

  type Mutation {
    addContact(name: String!, email: String!, mobileNumber: String!, message: String!): Contact!
    addPost(title: String!, body: String!): Post!
  }
`);

const root = {
  posts: () => posts,
  contacts: () => contacts,
  addContact: ({ name, email, mobileNumber, message }) => {
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      mobileNumber,
      message,
      createdAt: new Date().toISOString(),
    };
    contacts.push(newContact);
    return newContact;
  },
  addPost: ({ title, body }) => {
    const newPost = {
      id: Date.now().toString(),
      title,
      body,
    };
    posts.push(newPost);
    return newPost;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

app.post('/api/contacts', (req, res) => {
  const { name, email, mobileNumber, message } = req.body;

  if (!name || !email || !mobileNumber || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    mobileNumber,
    message,
    createdAt: new Date().toISOString(),
  };

  contacts.push(newContact);
  res.status(200).json(newContact);
});

app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  contacts = contacts.filter((contact) => contact.id !== id);
  res.json({ message: 'Contact deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint available at http://localhost:${PORT}/graphql`);
});