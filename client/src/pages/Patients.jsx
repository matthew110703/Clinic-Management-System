import { CustomDataGrid, CustomButton } from "../components";
import { Add } from "@mui/icons-material";
import { columnHeaders } from "../utils/tableData";
import { useMemo, useCallback } from "react";

// Redux imports
import { useDispatch } from "react-redux";
import { showForm } from "../store/formSlice";

// Services
import { fetchPatients } from "../services/patientService";
import { useEffect, useState } from "react";
import socket from "../services/socket";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  // Redux
  const dispatch = useDispatch();

  // Actions
  const actions = useMemo(
    () => ["editPatient", "viewPatient", "generateToken"],
    []
  );

  // Fetch patients function
  const loadPatients = useCallback(() => {
    fetchPatients({ page: 1, limit: 50 })
      .then((patients) => {
        setPatients(patients);
      })
      .catch((error) => console.error(error));
  }, []);

  // Fetch patients on component mount
  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  // Listen for socket events
  useEffect(() => {
    // Listen for new patient event
    socket.on("newPatient", () => {
      loadPatients();
    });

    // Listen for update patient event
    socket.on("updatePatient", () => {
      loadPatients();
    });

    // Listen for delete patient event
    socket.on("deletePatient", () => {
      loadPatients();
    });

    return () => {
      socket.off("newPatient");
      socket.off("updatePatient");
      socket.off("deletePatient");
    };
  }, [actions, loadPatients]);

  return (
    <div className="space-y-6">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-3xl">Manage Patients</h2>
        <CustomButton
          label="Add Patient"
          startIcon={<Add />}
          styles={{ padding: "8px 16px" }}
          onClick={() => {
            dispatch(
              showForm({
                type: "addPatient",
                title: "Patient Registration",
              })
            );
          }}
        />
      </div>

      {/* Data Grid */}
      <CustomDataGrid
        columns={columnHeaders.patientsTable}
        rows={patients}
        styles={{
          height: "calc(100vh - 230px)",
        }}
      />
    </div>
  );
};

export default Patients;
