import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/auth/" || "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.id) {
    axios.post(API_URL + "signout", {
      userId: user.id,
    }).catch(error => {
      console.error("Logout error:", error);
    });
  }
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
