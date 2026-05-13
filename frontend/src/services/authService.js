import axios from "axios";
const API_URL = "/api/auth";

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const verifyAccount = async (token) => {
  const response = await axios.get(`${API_URL}/verify/${token}`);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await axios.post(`${API_URL}/reset-password/${token}`, { newPassword });
  return response.data;
};