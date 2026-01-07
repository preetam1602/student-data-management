# Student Data Management (Backend)

A backend REST API built using Node.js, Express, and MongoDB to manage student records.

## Features
- Create, read, update, and delete student data
- MVC architecture
- MongoDB integration using Mongoose
- Input validation and error handling
- API testing using Postman

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose

## API Endpoints
- POST /api/students
- GET /api/students
- PUT /api/students/:id
- DELETE /api/students/:id

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd student-data
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your MongoDB connection string and other necessary variables.

4. Start the server:
   ```
   npm start
   ```

   For development:
   ```
   npm run dev
   ```

## License
ISC