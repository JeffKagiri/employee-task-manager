import api from './api';

const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

const googleLogin = async (token) => {
  const response = await api.post('/auth/google', { token });
  return response.data;
};

const authService = {
  register,
  login,
  googleLogin,
};

export default authService;
