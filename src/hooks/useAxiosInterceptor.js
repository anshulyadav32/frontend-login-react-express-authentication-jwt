import axios from "axios";
import TokenService from "../services/token.service";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api" || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/signin" && err.response) {
      // Access Token expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const refreshToken = TokenService.getLocalRefreshToken();
          
          if (!refreshToken) {
            // No refresh token available, redirect to login
            TokenService.removeUser();
            window.location.href = "/login";
            return Promise.reject(err);
          }

          const rs = await axios.post("http://localhost:5001/api/auth/refreshtoken", {
            refreshToken: refreshToken,
          });

          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);
          
          // Update the original request with new token
          originalConfig.headers["x-access-token"] = accessToken;
          
          return instance(originalConfig);
        } catch (_error) {
          // Refresh token is invalid, redirect to login
          TokenService.removeUser();
          window.location.href = "/login";
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
