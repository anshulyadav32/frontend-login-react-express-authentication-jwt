import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body text-center">
              <h1 className="card-title display-4 mb-4">
                Welcome to JWT Auth App
              </h1>
              <p className="card-text lead mb-4">
                A secure authentication system with JWT tokens and refresh token support.
              </p>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">🔐 Secure Authentication</h5>
                      <p className="card-text">
                        JWT-based authentication with automatic token refresh for enhanced security.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">🛡️ Role-Based Access</h5>
                      <p className="card-text">
                        Different access levels for users and administrators with protected routes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/login" className="btn btn-primary btn-lg me-3">
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline-primary btn-lg">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
