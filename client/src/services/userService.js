import axios from "axios";

const userEndpoint = `${import.meta.env.VITE_SERVER_URL}/users`;

// Function to fetch user profile
export const getUserProfile = async (id) => {
  try {
    const response = await axios.get(`${userEndpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again.");
  }
};

// Function to update user profile
export const updateUserProfile = async (id, data) => {
  try {
    const response = await axios.put(`${userEndpoint}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again.");
  }
};
