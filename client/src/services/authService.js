import axios from "axios";
const serverEndpoint = `${
  import.meta.env.VITE_SERVER_URL ||
  "https://clinic-management-system-jt8f.onrender.com"
}/auth`;

// Verify User Token
export const verifyUser = async (token) => {
  try {
    const response = await axios.get(`${serverEndpoint}/verify-token`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

// Login User with Email and Password
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${serverEndpoint}/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

// Logout User and Remove Token from Local Storage
export const logout = async () => {
  localStorage.removeItem("token");
  return;
};

// Register User
export const register = async (data) => {
  try {
    const response = axios.post(`${serverEndpoint}/register`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
