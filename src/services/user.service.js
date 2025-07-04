import api from "../hooks/useAxiosInterceptor";

const getPublicContent = () => {
  return api.get("/test/all");
};

const getUserContent = () => {
  return api.get("/test/user");
};

const getModeratorContent = () => {
  return api.get("/test/mod");
};

const getAdminContent = () => {
  return api.get("/test/admin");
};

const UserService = {
  getPublicContent,
  getUserContent,
  getModeratorContent,
  getAdminContent,
};

export default UserService;
