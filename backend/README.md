# Contact API Backend

A simple Node.js Express server for handling contact form submissions.

## Installation

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

The server will run on http://localhost:5000

## API Endpoints

- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create a new contact
- `DELETE /api/contacts/:id` - Delete a contact by ID

## Usage

Start the backend server first, then run your React frontend. The contact form will now save data to the backend API instead of Redux state.