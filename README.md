# JWT Authentication Frontend

A modern React frontend application with JWT authentication, refresh token support, and role-based access control.

## 🚀 Features

- **JWT Authentication** - Secure login/logout with JSON Web Tokens
- **Refresh Token Support** - Automatic token refresh for seamless user experience
- **Role-Based Access Control** - Different access levels for users and admins
- **Protected Routes** - Route protection based on authentication and roles
- **Modern UI** - Beautiful, responsive design with Bootstrap 5
- **Automatic Token Management** - Axios interceptors handle token refresh automatically

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **React Router Dom** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Bootstrap 5** - CSS framework for responsive design
- **LocalStorage** - Token storage

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will run on `http://localhost:5002`

## 🔧 Configuration

### Backend API URL
Update the API URL in the following files if your backend runs on a different port:

- `src/services/auth.service.js` - Line 3: `API_URL`
- `src/hooks/useAxiosInterceptor.js` - Line 5: `baseURL`

### Default Backend URL
```javascript
const API_URL = "http://localhost:5001/api/auth/";
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Home.js              # Landing page
│   ├── Login.js             # Login form
│   ├── Register.js          # Registration form
│   ├── Profile.js           # User profile page
│   ├── BoardUser.js         # User dashboard
│   ├── BoardAdmin.js        # Admin dashboard
│   └── Navbar.js            # Navigation bar
├── services/
│   ├── auth.service.js      # Authentication API calls
│   ├── user.service.js      # Protected API calls
│   └── token.service.js     # Token storage management
├── hooks/
│   └── useAxiosInterceptor.js # Axios interceptor for token refresh
├── App.js                   # Main app component with routing
├── index.js                 # React entry point
└── index.css               # Global styles
```

## 🔐 Authentication Flow

### Login Process
1. User enters credentials
2. Frontend sends POST to `/api/auth/signin`
3. Backend validates and returns `accessToken` + `refreshToken`
4. Tokens are stored in localStorage
5. User is redirected to profile page

### Token Refresh (Automatic)
1. API request returns 401 (Unauthorized)
2. Axios interceptor catches the error
3. Sends `refreshToken` to `/api/auth/refreshtoken`
4. Gets new `accessToken`
5. Retries original request with new token
6. If refresh fails, user is redirected to login

### Logout Process
1. Sends POST to `/api/auth/signout`
2. Removes tokens from localStorage
3. Redirects to login page

## 🛡️ Protected Routes

| Route | Access Level | Description |
|-------|-------------|-------------|
| `/` | Public | Home page |
| `/login` | Public | Login form |
| `/register` | Public | Registration form |
| `/profile` | Authenticated | User profile |
| `/user` | Authenticated | User dashboard |
| `/admin` | Admin only | Admin dashboard |

## 🎨 Components Overview

### Navbar
- Dynamic navigation based on authentication state
- Shows user info when logged in
- Logout functionality

### Login/Register
- Form validation
- Loading states
- Error handling
- Automatic redirection

### Profile
- Displays user information from JWT token
- Shows user roles and permissions
- Beautiful card-based layout

### BoardUser/BoardAdmin
- Protected components that call backend APIs
- Display server responses
- Role-based access control

## 🔧 Token Management

### Storage Strategy
- **Access Token**: localStorage (short-lived)
- **Refresh Token**: localStorage (long-lived)
- Tokens are automatically attached to API requests

### Security Features
- Automatic token refresh on 401 errors
- Secure token storage
- Proper logout cleanup
- Route protection

## 🚀 Usage

1. **Start the app**: `npm start`
2. **Register**: Create a new account
3. **Login**: Use your credentials
4. **Explore**: Navigate through protected routes
5. **Test**: Try accessing admin routes with user account

## 🌐 API Endpoints Expected

Your backend should provide these endpoints:

```
POST /api/auth/signin     # Login
POST /api/auth/signup     # Register
POST /api/auth/signout    # Logout
POST /api/auth/refreshtoken # Token refresh
GET  /api/test/all        # Public content
GET  /api/test/user       # User content
GET  /api/test/admin      # Admin content
```

## 🎯 Next Steps

1. **Customize UI**: Modify components to match your brand
2. **Add Features**: Implement password reset, email verification
3. **Enhance Security**: Add HTTPS, secure headers
4. **Deploy**: Use services like Netlify, Vercel, or AWS
5. **Testing**: Add unit tests with Jest and React Testing Library

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🔗 Related Projects

- **Backend API**: [Your Backend Repository Here]
- **Documentation**: [API Documentation Here]

## 📞 Support

If you have any questions or need help, please:
1. Check the documentation
2. Open an issue on GitHub
3. Contact the development team

---

**Built with ❤️ using React and modern web technologies**
