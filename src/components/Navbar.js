import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentUser, logOut }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          JWT Auth App
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            
            {currentUser && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/user">
                    User Board
                  </Link>
                </li>
                
                {currentUser.roles.includes('admin') && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Admin Board
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
          
          <ul className="navbar-nav">
            {currentUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <i className="fas fa-user me-1"></i>
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-outline-light btn-sm ms-2" 
                    onClick={logOut}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
