# jamesFlix

**jamesFlix** is a full-stack web application that allows users to browse, search for, and stream content. The app is built with a modern frontend using React and Tailwind and a powerful backend API using express and MongoDB to handle various user interactions and media streaming.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
## Features

- User authentication and authorization.
- Browse and stream media content.
- Search for movies, TV shows, and actors.
- Keep an updated track of everything you have searched for.
- Responsive UI built with React, and tailwind css.
- Backend API built with a modular architecture to handle requests and manage data.

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework.
- **PostCSS**: For transforming styles.

### Backend
- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for managing media data.
- **JWT**: For secure user authentication.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jt989073/jamesFlix.git
   cd jamesFlix
   ```

2. Install dependencies for both frontend and backend:

   **Frontend**:
   ```bash
   cd frontend
   npm install
   ```

   **Backend** from the root directory:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the backend directory and add the following environment variables:

```bash
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
PORT=5000
```

## Running the Application

### Backend

Ensure your MongoDB server is running. Then, start the backend server from the root directory:

```bash
npm run dev
```

### Frontend

Start the frontend development server:

```bash
cd frontend
npm run dev
```

Both the frontend and backend should now be running on their respective ports.

## Project Structure

```bash
jamesFlix/
│
├── backend/                   # Backend source code
│   ├── config/                # Configuration files
│   ├── controllers/           # Controller logic
│   ├── middleware/            # Custom middleware
│   ├── models/                # MongoDB models
│   ├── routes/                # API routes
│   ├── services/              # Business logic services
│   └── server.js              # Main server entry point
│
├── frontend/                  # Frontend source code
│   ├── src/                   # React components and logic
│   ├── public/                # Public assets
│   ├── index.html             # Main HTML template
│   └── vite.config.js         # Vite configuration
│
├── .env                       # Environment variables
├── package.json               # Project metadata
└── README.md                  # Project documentation
```
