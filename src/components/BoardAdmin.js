import React, { useEffect, useState } from 'react';
import UserService from '../services/user.service';

const BoardAdmin = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    UserService.getAdminContent()
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
        <div className="col-md-10">
          <div className="card">
            <div className="card-header bg-danger text-white">
              <h3 className="card-title mb-0">
                <i className="fas fa-crown me-2"></i>
                Admin Dashboard
              </h3>
            </div>
            <div className="card-body">
              <div className="alert alert-warning">
                <i className="fas fa-shield-alt me-2"></i>
                This is a restricted admin area. Only administrators can access this page.
              </div>
              
              <div className="mb-4">
                <h5>Server Response:</h5>
                <div className="bg-light p-3 rounded">
                  <code>{content}</code>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-4">
                  <div className="card border-danger">
                    <div className="card-body">
                      <h6 className="card-title">🔐 Authentication Status</h6>
                      <p className="card-text text-success">
                        <i className="fas fa-check-circle me-1"></i>
                        Successfully authenticated
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card border-warning">
                    <div className="card-body">
                      <h6 className="card-title">🛡️ Access Level</h6>
                      <p className="card-text text-danger">
                        <i className="fas fa-crown me-1"></i>
                        Administrator Access
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card border-info">
                    <div className="card-body">
                      <h6 className="card-title">⚙️ Admin Features</h6>
                      <p className="card-text text-info">
                        <i className="fas fa-cogs me-1"></i>
                        Full System Access
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h5>Admin Actions</h5>
                <div className="row">
                  <div className="col-md-6">
                    <div className="list-group">
                      <div className="list-group-item list-group-item-action">
                        <i className="fas fa-users me-2"></i>
                        User Management
                      </div>
                      <div className="list-group-item list-group-item-action">
                        <i className="fas fa-key me-2"></i>
                        Role Management
                      </div>
                      <div className="list-group-item list-group-item-action">
                        <i className="fas fa-database me-2"></i>
                        Database Administration
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="list-group">
                      <div className="list-group-item list-group-item-action">
                        <i className="fas fa-chart-bar me-2"></i>
                        System Analytics
                      </div>
                      <div className="list-group-item list-group-item-action">
                        <i className="fas fa-cog me-2"></i>
                        System Settings
                      </div>
                      <div className="list-group-item list-group-item-action">
                        <i className="fas fa-shield-alt me-2"></i>
                        Security Management
                      </div>
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

export default BoardAdmin;
