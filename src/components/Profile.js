import React from 'react';

const Profile = ({ currentUser }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card profile-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                <i className="fas fa-user-circle me-2"></i>
                User Profile
              </h2>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Username:</label>
                    <p className="form-control-plaintext">{currentUser.username}</p>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email:</label>
                    <p className="form-control-plaintext">{currentUser.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">User ID:</label>
                <p className="form-control-plaintext font-monospace">{currentUser.id}</p>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Roles:</label>
                <div className="mt-2">
                  {currentUser.roles.map((role, index) => (
                    <span 
                      key={index} 
                      className={`badge me-2 ${role === 'admin' ? 'admin-badge' : 'user-badge'}`}
                    >
                      {role.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Access Level:</label>
                <div className="mt-2">
                  {currentUser.roles.includes('admin') && (
                    <div className="alert alert-info">
                      <i className="fas fa-crown me-2"></i>
                      You have administrator privileges
                    </div>
                  )}
                  {currentUser.roles.includes('user') && (
                    <div className="alert alert-success">
                      <i className="fas fa-user me-2"></i>
                      You have user access
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  Profile information is automatically loaded from your JWT token
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
