
# Music Streaming Backend API

A backend application inspired by music streaming platforms, built with Node.js, Express.js, and MongoDB. It provides APIs for user authentication, role-based authorization, music uploads using ImageKit, and album management.

## Features

- User registration, login, and logout
- JWT-based authentication using HTTP cookies
- Role-based authorization for users and artists
- Password hashing using bcrypt
- Create and retrieve music
- Create and retrieve albums
- Fetch individual albums by ID
- MongoDB integration using Mongoose
- Music file uploads and cloud storage using ImageKit
- Separate controllers, routes, models, middleware, and services

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- cookie-parser
- ImageKit for media storage
- Multer or the configured middleware for file uploads

## Project Structure

```text
music-streaming-backend-api/
├── src/
│   ├── controllers/
│   │   ├── auth.controllers.js
│   │   └── music.controllers.js
│   ├── db/
│   │   └── db.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── album.model.js
│   │   ├── music.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── music.routes.js
│   ├── services/
│   │   └── storage.service.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Prerequisites

- Node.js and npm
- MongoDB or a MongoDB Atlas database
- An ImageKit account with the required API credentials

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/music-streaming-backend-api.git
cd music-streaming-backend-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and configure the variables required by your implementation.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Use the exact variable names expected by your database connection, authentication, and ImageKit configuration.

Never commit your `.env` file or expose credentials publicly.

### 4. Start the server

Run the start command configured in `package.json`. For example:

```bash
npm start
```

If your project uses a development script, you may use:

```bash
npm run dev
```

## API Capabilities

### Authentication

- Register a new user
- Log in using credentials
- Log out and clear the authentication cookie

### Music Management

- Create music as an authorized artist
- Upload music files to ImageKit
- Retrieve available music records

### Album Management

- Create albums as an authorized artist
- Retrieve available albums
- Fetch an individual album by ID

The exact endpoints and request formats are defined in the application's route files.

## Role-Based Authorization

The application supports two roles:

- **User:** A regular user with access to operations permitted by the application's route configuration.
- **Artist:** An artist authorized to create music and albums through protected endpoints.

JWT authentication middleware verifies the token, while role-specific middleware checks whether the authenticated account has permission to perform an operation.

## Learning Objectives

This project demonstrates practical backend development concepts, including:

- REST API development
- Authentication and authorization
- Password hashing
- JWT and cookie-based authentication
- MongoDB schemas and model relationships
- File uploads and cloud media storage
- Modular backend architecture

## Future Improvements

- Add request validation and centralized error handling
- Implement pagination and music search
- Add automated API testing
- Improve cookie security and token expiration
- Strengthen artist role assignment
- Add deployment and API documentation

## Author

Developed as a backend development learning project.
