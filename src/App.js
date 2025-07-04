import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardAdmin from './components/BoardAdmin';
import Home from './components/Home';
import AuthService from './services/auth.service';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar currentUser={currentUser} logOut={logOut} />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!currentUser ? <Login setCurrentUser={setCurrentUser} /> : <Navigate to="/profile" />} />
            <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/profile" />} />
            <Route path="/profile" element={currentUser ? <Profile currentUser={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/user" element={currentUser ? <BoardUser /> : <Navigate to="/login" />} />
            <Route path="/admin" element={currentUser && currentUser.roles.includes('admin') ? <BoardAdmin /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
