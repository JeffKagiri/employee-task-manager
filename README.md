# 📋 Employee Task Manager

A modern, full-stack task management application built with the MERN stack. Designed to help teams and individuals organize, track, and complete tasks efficiently with a beautiful, responsive interface.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based Authentication** - Secure token-based user sessions
- **Google OAuth Integration** - Quick signup/login with Google
- **Password Encryption** - bcrypt hashing for secure password storage
- **Protected Routes** - Middleware-based route protection
- **Terms Agreement Enforcement** - Users must agree to Terms of Service before signup

### 📊 Task Management
- **Full CRUD Operations** - Create, Read, Update, and Delete tasks
- **Smart Status Tracking** - Automatic status updates based on deadlines
  - Tasks become "In Progress" on their due date
  - Tasks become "Overdue" when the deadline passes
- **DateTime Precision** - Set exact deadlines with date and time
- **Priority Levels** - Organize tasks by priority (High, Medium, Low)
- **One-Click Completion** - Toggle task completion with a single click
- **Real-time Dashboard** - Live statistics and task overview

### 🎨 Modern UI/UX
- **Full-Page Scroll Snapping** - Smooth, presentation-style scrolling on home page
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark-Themed Navigation** - Professional header with user profile dropdown
- **Gender-Aware Avatars** - Personalized placeholder avatars
- **Glassmorphism Effects** - Modern, premium design aesthetics
- **Micro-Animations** - Smooth transitions and hover effects

### 👤 User Profile
- **Profile Dropdown** - Quick access to settings and logout
- **Department & Position Tracking** - Organize users by role
- **Avatar Display** - Visual user identification

## 🚀 Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Google OAuth** - `@react-oauth/google`
- **Material-UI** - Component library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Google Auth Library** - OAuth verification

## 📁 Project Structure

```
employee-task-manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Benefits/
    │   │   ├── Features/
    │   │   ├── Home/
    │   │   └── Layout/
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── CreateTask.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── services/
    │   │   ├── authService.js
    │   │   └── taskService.js
    │   ├── styles/
    │   │   ├── Auth.css
    │   │   └── global.css
    │   ├── App.js
    │   └── index.js
    ├── .env
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Google Cloud Console account (for OAuth)

### 1. Clone the Repository
```bash
git clone https://github.com/JeffKagiri/employee-task-manager.git
cd employee-task-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the frontend development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## 🔑 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **OAuth consent screen**
4. Configure the consent screen with your app details
5. Go to **Credentials** > **Create Credentials** > **OAuth client ID**
6. Select **Web application**
7. Add authorized JavaScript origins:
   - `http://localhost:3000`
8. Add authorized redirect URIs:
   - `http://localhost:3000`
9. Copy the **Client ID** and add it to both `.env` files

## 📖 Usage

### Creating an Account
1. Navigate to the home page
2. Click "Get Started Free" or "Sign Up"
3. Fill in your details (name, email, password, department, position, gender)
4. **Agree to Terms of Service** (required)
5. Click "Create Account" or "Sign up with Google"

### Managing Tasks
1. **Create a Task**: Click "New Task" or "Create Task"
   - Enter title, description, priority, status
   - Set a precise deadline (date and time)
2. **View Tasks**: Dashboard shows all your tasks with statistics
3. **Filter Tasks**: Filter by status (All, To Do, In Progress, Completed, Overdue)
4. **Edit Task**: Click the edit icon on any task card
5. **Complete Task**: Click the green checkmark to toggle completion
6. **Delete Task**: Click the delete icon (with confirmation)

### Dashboard Features
- **Total Tasks** - Count of all your tasks
- **Completed** - Tasks marked as done
- **In Progress** - Tasks due today
- **Overdue** - Tasks past their deadline

## 🎨 Design Philosophy

This application follows modern web design principles:
- **Premium Aesthetics** - Vibrant colors, gradients, and smooth animations
- **User-Centric** - Intuitive navigation and clear visual hierarchy
- **Responsive First** - Mobile-optimized with touch-friendly interactions
- **Performance** - Optimized rendering and smooth scroll snapping
- **Accessibility** - Semantic HTML and proper contrast ratios

## 🔒 Security Features

- JWT tokens stored in localStorage
- Password hashing with bcrypt (10 salt rounds)
- Protected API routes with authentication middleware
- User-specific data isolation
- Terms of Service agreement enforcement
- Input validation on both client and server

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth login

### Tasks
- `GET /api/tasks` - Get all user tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Jeff Kagiri**
- GitHub: [@JeffKagiri](https://github.com/JeffKagiri)

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB for the flexible database
- Google for OAuth integration
- The open-source community

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Built with ❤️ using the MERN Stack**
