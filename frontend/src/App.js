import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Import styles
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-task" element={<h1>Create Task Page</h1>} />
          <Route path="/demo" element={<h1>Demo Page</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;