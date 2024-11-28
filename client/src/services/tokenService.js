import axios from "axios";

const tokenAPIEndpoint = `${
  import.meta.env.VITE_SERVER_URL ||
  "https://clinic-management-system-jt8f.onrender.com"
}/tokens`;

// Fetch all tokens by present date
export const fetchTokens = async (status = "") => {
  try {
    const { data } = await axios.get(tokenAPIEndpoint, {
      params: {
        page: 1,
        limit: 50,
        status,
        // byDate: new Date().toISOString(),
      },
    });

    // Format the data
    const tokens = data.tokens.map((token) => {
      return {
        fullName: token.patient.fullName,
        phone: token.patient.phone,
        ...token,
        actions: ["patientDetail", "tokenCancel"],
      };
    });

    return tokens;
  } catch (error) {
    console.error(error);
  }
};

// Update token status
export const updateTokenStatus = async (id, status) => {
  try {
    const { data } = await axios.put(`${tokenAPIEndpoint}/${id}`, { status });
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Delete token
export const deleteToken = async (id) => {
  try {
    const { data } = await axios.delete(`${tokenAPIEndpoint}/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
