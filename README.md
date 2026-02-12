# Student Data Management System

A full-stack web application for managing student records with user authentication. Built with React, Node.js, Express, and MongoDB.

## 🎯 Features

- **User Authentication**: Login and signup functionality
- **Student Management**: Create, read, update, and delete student records
- **Search & Filter**: Search students by name/USN and filter by branch
- **Statistics Dashboard**: View student distribution by branch and age
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Real-time Updates**: Data persists in MongoDB and updates instantly

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM

### Backend
- Node.js
- Express.js 5
- MongoDB with Mongoose
- Bcrypt for password hashing
- CORS enabled

## 📁 Project Structure

```
student-data/
├── backend/
│   └── src/
│       ├── config/          # Database and constants
│       ├── controllers/     # Business logic
│       ├── models/         # MongoDB schemas
│       ├── routes/         # API routes
│       ├── app.js          # Express app setup
│       └── index.js        # Server entry point
├── frontend/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       └── App.jsx         # Main app component
└── .env                    # Environment variables
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd student-data
```

### 2. Set up environment variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/studentdata
```

### 3. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 4. Run the application

#### Development Mode (Recommended)

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` (Vite default)
The backend will run on `http://localhost:5000`

#### Production Mode
```bash
# Build frontend
npm run build

# Start production server
npm start
```

## 📡 API Endpoints

### User Routes (`/api/v1/users`)
- `POST /register` - Create new user account
- `POST /login` - User login
- `POST /logout` - User logout

### Student/Post Routes (`/api/v1/posts`)
- `POST /create` - Create a new student record
- `GET /all` - Get all student records
- `PATCH /update/:id` - Update student by ID
- `DELETE /delete/:id` - Delete student by ID

## 📋 Student Data Schema

```javascript
{
  name: String,     // Full name
  usn: String,      // University Serial Number (unique)
  age: Number,      // Age (15-30)
  branch: String    // Department (CSE, ECE, ME, CIVIL, EEE)
}
```

## 🔐 User Data Schema

```javascript
{
  username: String,  // Unique username
  email: String,     // Unique email
  password: String,  // Hashed password
  loggedIn: Boolean  // Login status
}
```

## 🎨 Available Scripts

- `npm run dev` - Start backend in development mode with nodemon
- `npm start` - Start backend in production mode
- `npm run build` - Build frontend and prepare for production
- `cd frontend && npm run dev` - Start frontend development server
- `cd frontend && npm run build` - Build frontend for production

## 📝 Usage

1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Access the dashboard with your credentials
3. **Add Students**: Click "Add Student" and fill in the form
4. **View Students**: All students are displayed in a responsive table/card layout
5. **Search**: Use the search bar to find students by name or USN
6. **Filter**: Filter students by branch using the dropdown
7. **Edit**: Click the edit button to modify student details
8. **Delete**: Remove student records with confirmation

## 🔒 Security Features

- Password hashing with bcrypt
- Input validation on both frontend and backend
- Unique constraints on email, username, and USN
- CORS protection
- Error handling middleware

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

**Preetam N Gowda**

## 📄 License

ISC