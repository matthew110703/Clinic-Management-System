import Proptypes from "prop-types";

// UI Components
import { Divider, Paper } from "@mui/material";
import IconButton from "../buttons/IconButton";
import { Close, Edit } from "@mui/icons-material";

// React
import React, { useEffect, memo, useState, useCallback } from "react";

// Redux
import { useDispatch } from "react-redux";
import { hideCard } from "../../store/backdropCardSlice";

// Services
import { fetchMedicalHistory } from "../../services/patientService";

import moment from "moment";

const MedicalHistoryCard = memo(({ date, diagnosis, medication, notes }) => {
  return (
    <div className="flex flex-col gap-1 bg-background py-2 px-4 rounded-xl">
      <p>
        Date: <span className="font-light">{date || ""}</span>
      </p>
      <p>
        Diagnosis: <span className="font-light">{diagnosis || ""}</span>
      </p>
      <p>
        Medication: <span className="font-light">{medication || ""}</span>
      </p>
      <p>
        Notes: <span className="font-light">{notes || ""}</span>
      </p>
    </div>
  );
});

MedicalHistoryCard.displayName = "MedicalHistoryCard";

MedicalHistoryCard.propTypes = {
  date: Proptypes.string.isRequired,
  diagnosis: Proptypes.string.isRequired,
  medication: Proptypes.string,
  notes: Proptypes.string,
};

const PatientCard = ({ variant = "default", patient, classes }) => {
  // Redux
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideCard());
  };

  // Local state
  const [medicalHistory, setMedicalHistory] = useState([]);

  const fetchHistory = useCallback(() => {
    const history = patient.medicalHistory || [];

    // Fetch medical history
    if (history.length === 0) return;

    history.forEach(async (id) => {
      try {
        const data = await fetchMedicalHistory(id);
        setMedicalHistory((prev) => [...prev, data]);
      } catch (error) {
        console.error(error);
      }
    });
  }, [patient.medicalHistory]);

  // On component mount
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  if (!patient) {
    return (
      <div className="text-error">
        An error occured while fetching patient details
      </div>
    );
  }

  // Default variant
  if (variant === "default") {
    return (
      <Paper
        elevation={3}
        sx={{
          width: 320,
          height: 80,
          borderRadius: "10px",
        }}
        className={`py-2 px-4 hover:shadow-lg hover:bg-gray-100 cursor-pointer ${classes}`}
        onClick={() => console.log("Patient Card Clicked")}
      >
        <div className="flex items-baseline gap-x-3">
          <h4 className="text-xl font-bold">
            {patient.fullName || "Unknown Patient"}
          </h4>
          <Divider orientation="vertical" flexItem variant="middle" />
          <span className="text-md text-gray-400">
            {patient.age || "N/A"} years
          </span>
          <Divider orientation="vertical" flexItem variant="middle" />
          <span className="text-md text-gray-400">
            {patient.gender || "N/A"}
          </span>
        </div>
        <Divider variant="middle" />
        <div className="flex items-center justify-start gap-2 mt-4">
          <p className="text-sm font-semibold">{patient.phone || "N/A"}</p>
          <Divider orientation="vertical" flexItem variant="middle" />
          <p className="text-xs">Last Visit on {patient.lastVisted || "N/A"}</p>
        </div>
      </Paper>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <div
        style={{
          width: 1256,
        }}
        className="bg-white space-y-2 rounded-3xl p-4 border-2 border-primary"
      >
        {/* Header  */}
        <div className="flex justify-between items-center">
          <div className="flex gap-x-4 items-baseline">
            <h4 className="text-2xl font-bold">
              {patient.fullName || "Unknown Patient"}
            </h4>
            <span className="text-md text-gray-400">{patient.age} years</span>
            <Divider orientation="vertical" flexItem variant="middle" />
            <span className="text-md text-gray-400">{patient.gender}</span>
            <Divider orientation="vertical" flexItem variant="middle" />
            <span className="text-md text-gray-400">{patient.phone}</span>
            <IconButton
              icon={<Edit />}
              size="small"
              color="primary"
              toolTipText="Edit Patient details"
              disabled
            />
          </div>
          <div className="flex gap-2">
            <IconButton
              icon={<Close />}
              color="error"
              toolTipText="Close"
              onClick={handleClose}
            />
          </div>
        </div>

        <Divider variant="middle" />

        {/* Body */}
        <div className="w-full flex flex-row gap-x-2">
          {/* Medical History (Scrollable) */}

          <div className="basis-1/2">
            <h5 className="text-lg font-semibold">Medical History</h5>
            <Paper
              variant="outlined"
              className="p-2 w-full h-36 overflow-y-auto space-y-2"
              sx={{ borderRadius: "10px", height: "400px" }}
            >
              {medicalHistory.length === 0 ? (
                <p className="text-center text-gray-400">No medical history</p>
              ) : (
                medicalHistory.map((history) => (
                  <React.Fragment key={history._id}>
                    <MedicalHistoryCard
                      key={history._id}
                      date={history.date}
                      diagnosis={history.diagnosis}
                      medication={history.medication}
                      notes={history.notes}
                    />
                    <Divider />
                  </React.Fragment>
                ))
              )}
            </Paper>
          </div>

          <Divider orientation="vertical" flexItem variant="middle" />

          {/* Previous Prescription (Non-Scrollable) */}
          <div className="basis-1/2">
            <h5 className="font-bold text-lg">Previous Prescription</h5>
            <Paper
              variant="outlined"
              sx={{ borderRadius: "10px", height: "300px" }}
              className="py-3 px-6 w-full space-y-4 text-md overflow-y-auto"
            >
              <p className="font-semibold">
                Date:{" "}
                <span className="text-xl font-light">September 25th, 2024</span>
              </p>
              <p className="font-semibold">
                Diagnosis:{" "}
                <span className="text-xl font-light">Common Cold</span>
              </p>
              <p className="font-semibold">
                Medication:{" "}
                <span className="text-xl font-light">
                  Paracetemol Crosin Dolo 650
                </span>
              </p>
              <p className="font-semibold">
                Notes:{" "}
                <span className="text-xl font-light">
                  Blood pressure was elevated, recommended routine check-ups.
                </span>
              </p>
            </Paper>
            <div className="space-y-2 mt-3 ml-3">
              <p className="text-md font-normal">
                Total Visits:{" "}
                <span className="font-bold text-xl">
                  {patient.medicalHistory?.length + 1}
                </span>
              </p>
              <p className="text-md font-normal">
                Last Visted On:{" "}
                <span className="font-bold text-xl">25th September, 2024</span>
              </p>
              <p className="text-md font-normal">
                Registed On:{" "}
                <span className="font-bold text-xl">
                  {moment(patient.createdAt).format("ddd DD MMMM, YYYY LT")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
PatientCard.displayName = "PatientCard";

export default PatientCard;

PatientCard.propTypes = {
  variant: Proptypes.oneOf(["default", "compact"]),
  patient: Proptypes.object.isRequired,
  classes: Proptypes.string,
};
