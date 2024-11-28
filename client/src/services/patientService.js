import axios from "axios";

const patientAPIEndpoint = `${import.meta.env.VITE_SERVER_URL}/patients`;

// Register a new patient
export const registerPatient = async (patient) => {
  try {
    const response = await axios.post(patientAPIEndpoint, patient);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to register patient");
  }
};

// Fetch all patients
export const fetchPatients = async ({
  page = 1,
  limit = 10,
  searchByName = "",
  searchByPhone = "",
  orderBy = "createdAt:desc",
}) => {
  try {
    const { data } = await axios.get(patientAPIEndpoint, {
      params: {
        page,
        limit,
        searchByName,
        searchByPhone,
        orderBy,
      },
    });

    // Format the data
    const patients = data.patients.map((patient) => {
      return {
        ...patient,
        actions: ["editPatient", "viewPatient", "generateToken"],
      };
    });

    return patients;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch patients");
  }
};

// Get Patient by ID
export const getPatientById = async (id) => {
  try {
    const { data } = await axios.get(`${patientAPIEndpoint}/${id}`);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch patient");
  }
};

// Update Patient by ID
export const updatePatient = async (id, patient) => {
  try {
    const response = await axios.put(`${patientAPIEndpoint}/${id}`, patient);
    return response.data.message;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update patient");
  }
};

// Delete Patient by ID
export const deletePatient = async (id) => {
  try {
    const response = await axios.delete(`${patientAPIEndpoint}/${id}`);
    return response.data.message;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete patient");
  }
};

// Generate Token for Patient
export const generateToken = async (patientId) => {
  try {
    const { data } = await axios.post(
      `${patientAPIEndpoint}/${patientId}/generate-token`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate token");
  }
};

// Fetch all medical history for a patient
export const fetchMedicalHistory = async (patientId) => {
  try {
    const { data } = await axios.get(
      `${patientAPIEndpoint}/${patientId}/consultations`
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch medical history");
  }
};
