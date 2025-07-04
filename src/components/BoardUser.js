import React, { useEffect, useState } from 'react';
import UserService from '../services/user.service';

const BoardUser = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    UserService.getUserContent()
      .then(
        (response) => {
          setContent(response.data);
          setLoading(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setError(resMessage);
          setLoading(false);
        }
      );
  }, []);

  if (loading) {
    return (
      <div className="container text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h3 className="card-title mb-0">
                <i className="fas fa-users me-2"></i>
                User Dashboard
              </h3>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <i className="fas fa-info-circle me-2"></i>
                This is a protected user area. You can only access this page if you're logged in.
              </div>
              
              <div className="mb-4">
                <h5>Server Response:</h5>
                <div className="bg-light p-3 rounded">
                  <code>{content}</code>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="card border-primary">
                    <div className="card-body">
                      <h6 className="card-title">🔐 Authentication Status</h6>
                      <p className="card-text text-success">
                        <i className="fas fa-check-circle me-1"></i>
                        Successfully authenticated
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="card border-info">
                    <div className="card-body">
                      <h6 className="card-title">🛡️ Access Level</h6>
                      <p className="card-text text-info">
                        <i className="fas fa-user me-1"></i>
                        User Level Access
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardUser;
