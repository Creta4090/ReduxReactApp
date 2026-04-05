const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for contacts (replace with database in production)
let contacts = [];

// Routes
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
    createdAt: new Date().toISOString()
  };

  contacts.push(newContact);
  res.status(200).json(newContact);
});

app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  contacts = contacts.filter(contact => contact.id !== id);
  res.json({ message: 'Contact deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});