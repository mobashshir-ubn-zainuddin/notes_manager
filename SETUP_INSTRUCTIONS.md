# MERN Notes Management App - Setup Instructions

## Overview
A complete Notes Management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)

## Backend Setup

### 1. Create MongoDB Connection
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Click "Create a Deployment" and select the free tier
4. Follow the setup wizard to create a cluster
5. Click "Connect" and copy the connection string
6. Replace `<username>` and `<password>` in the URI with your credentials

### 2. Environment Variables
Create a `.env` file in the `server` folder and add:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notesapp?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_min_32_chars_long_use_command_below
PORT=5000
CLIENT_URL=http://localhost:3000
```

**To generate a strong JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and paste it as your JWT_SECRET value.

### 3. Install Dependencies
```bash
cd server
npm install
```

### 4. Start Backend Server
```bash
npm run dev
```
The server will run on http://localhost:5000

## Frontend Setup

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Start Frontend Server
```bash
npm run dev
```
The app will open at http://localhost:3000

## Features

✅ **Authentication**
- Register with email and password
- Login with JWT token
- Protected routes

✅ **Notes Management**
- Create notes with title and description
- View all your notes
- Delete notes
- Notes are user-specific

✅ **Security**
- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Notes
- `GET /api/notes` - Get all user notes (Protected)
- `POST /api/notes` - Create a new note (Protected)
- `DELETE /api/notes/:id` - Delete a note (Protected)

## Troubleshooting

**Backend won't start:**
- Check if MongoDB URI is correct
- Ensure JWT_SECRET is set
- Check if port 5000 is not in use

**Frontend won't connect to backend:**
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify CLIENT_URL in backend .env file

**Notes not showing:**
- Check if you're logged in
- Check browser Network tab for API errors
- Verify token is being sent correctly

## Project Structure

```
notes-management-app/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── notes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── client/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── components/
    │   │   ├── NoteForm.jsx
    │   │   ├── NotesList.jsx
    │   │   └── NoteCard.jsx
    │   ├── styles/
    │   │   ├── index.css
    │   │   ├── app.css
    │   │   ├── auth.css
    │   │   ├── dashboard.css
    │   │   └── components.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## Future Enhancements
- Edit existing notes
- Search functionality
- Note categories/tags
- Dark mode
- Export notes
- Real-time synchronization
