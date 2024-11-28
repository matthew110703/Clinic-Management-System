import {
  HighlightOffOutlined,
  Logout,
  OpenInNew,
  TripOrigin,
} from "@mui/icons-material";
import {
  ProfileButton,
  SearchBar,
  DataLabel,
  CustomButton,
  CustomTextField,
  ModalForm,
  CustomDialog,
  PatientCard,
  Footer,
} from "../components";
import { Divider, Backdrop, Alert, Snackbar } from "@mui/material";

import { useState, useEffect, useCallback } from "react";

// Redux
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateStats } from "../store/stats";

// Services
import { logout as logoutUser } from "../services/authService";
import { getPatientById } from "../services/patientService";
import { fetchTokens, updateTokenStatus } from "../services/tokenService";
import socket from "../services/socket";
import moment from "moment";

const Doctor = () => {
  // Redux State
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.stats);

  // Local State
  const [currentToken, setCurrentToken] = useState({});
  const [currentPatient, setCurrentPatient] = useState({});
  const [socketFlag, setSocketFlag] = useState(false);

  useEffect(() => {
    console.log("Current Patient", currentPatient);
  }, [currentPatient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  const handleLogut = () => {
    logoutUser();
    dispatch(logout());
  };

  const loadStats = useCallback(
    async (tokens) => {
      // Update Stats
      const waiting = tokens.filter(
        (token) => token.status === "waiting"
      ).length;
      const served = tokens.filter((token) => token.status === "served").length;
      dispatch(updateStats({ waiting, served }));
    },
    [dispatch]
  );
  const loadCurrentPatient = useCallback(
    async (tokens) => {
      const consultingPatient =
        tokens.find((token) => token.status === "consulting") ||
        tokens.find((token) => token.status === "waiting");
      await updateTokenStatus(consultingPatient._id, "consulting").then(
        async (res) => {
          const patient = await getPatientById(consultingPatient.patient._id);
          setCurrentPatient(patient);
          setCurrentToken(res.token);
        }
      );
      loadStats(tokens);
    },
    [loadStats]
  );

  useEffect(() => {
    fetchTokens()
      .then((res) => {
        loadCurrentPatient(res);
      })
      .catch((err) => alert("An Error occured.", err));
  }, [loadCurrentPatient, loadStats, socketFlag]);

  // Listenser
  useEffect(() => {
    socket.on("newPatient", () => {
      setSocketFlag(!socketFlag);
    });
    socket.on("updatePatient", () => {
      setSocketFlag(!socketFlag);
    });
    socket.on("deletePatient", () => {
      setSocketFlag(!socketFlag);
    });
    socket.on("newToken", () => {
      setSocketFlag(!socketFlag);
    });
    socket.on("updateToken", () => {
      setSocketFlag(!socketFlag);
    });
    socket.on("deleteToken", () => {
      setSocketFlag(!socketFlag);
    });
  }, [setSocketFlag, socketFlag]);

  return (
    <>
      {/* Main Content */}
      <div className="h-screen w-screen p-2 overflow-auto overscroll-y-auto">
        {/* Header */}
        <div className="px-8 py-4 flex justify-between items-center shadow-lg rounded-b-3xl">
          <ProfileButton label="Dr. Jane Doe" icon={<TripOrigin />} />
          <div className="flex gap-x-6">
            <SearchBar classes={"justify-self-end"} />
            <CustomButton
              variant="filled"
              size="small"
              label="Logout"
              startIcon={<Logout />}
              onClick={handleLogut}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-x-8 p-6">
          <div className="flex flex-col gap-y-4 basis-1/2">
            {/* Data Labels */}
            <div className="flex gap-x-4">
              <DataLabel
                label="Waiting"
                value={stats.waiting}
                info={"Current Queue"}
              />
              <Divider variant="middle" orientation="vertical" flexItem />
              <DataLabel
                label="Patients Consulted"
                value={stats.served}
                info={"Consulted Patients as of (today)"}
              />
            </div>
            <Divider variant="middle" orientation="horizontal" flexItem />
            {/* Actions */}
            <div className="flex gap-x-3 items-center justify-end">
              <h5 className="mr-auto text-xl">Current Patient</h5>
              <CustomButton
                variant="outlined"
                label="View Previous Consultation"
                startIcon={<OpenInNew />}
              />
              <CustomButton
                variant="outlined"
                color={"error"}
                label="Skip Patient"
                startIcon={<HighlightOffOutlined />}
              />
            </div>

            {/* Consultation Form */}
            <form
              onSubmit={handleSubmit}
              className="py-6 px-8 space-y-6 border bg-white rounded-xl"
            >
              <div className="flex justify-between items-baseline">
                <p className="font-semibold text-lg">
                  Patient Name:{" "}
                  <span className="text-3xl">{currentPatient.fullName}</span>
                </p>
                <p className="font-semibold text-lg">
                  Token No.{" "}
                  <span className="text-3xl font-bold">
                    {currentToken.tokenNo}
                  </span>
                </p>
              </div>
              <div className="flex gap-x-3 items-baseline">
                <p className="font-semibold text-lg">
                  Gender:{" "}
                  <span className="text-3xl">{currentPatient.gender}</span>
                </p>
                <Divider variant="middle" orientation="vertical" flexItem />
                <p className="font-semibold text-3xl">
                  {currentPatient.age}{" "}
                  <span className="text-lg">years old</span>
                </p>
              </div>

              <CustomTextField
                label="Diagnosis"
                placeholder="Enter Diagnosis"
              />
              <CustomTextField
                type={"textarea"}
                label="Prescription"
                placeholder="Write Prescription here..."
              />
              <CustomTextField
                type={"textarea"}
                label="Notes"
                placeholder="Add Notes here..."
              />
              <CustomButton
                variant="filled"
                size="large"
                label="Submit"
                type="submit"
                classes={"w-full"}
              />
            </form>
          </div>
          <Divider variant="middle" orientation="vertical" flexItem />
          {/* Patient Details */}
          <div className="basis-1/2 flex flex-col gap-y-4 p-6 border ">
            <h5 className="text-2xl font-semibold">Patient Details</h5>
            <Divider variant="middle" orientation="horizontal" flexItem />
            <p className="text-lg">
              Phone No.{" "}
              <span className="text-2xl font-semibold">
                +91 {currentPatient.phone}
              </span>
            </p>
            <p className="text-lg">
              Registered On:{" "}
              <span className="text-2xl font-semibold">
                {moment(currentPatient.createdAt).format(
                  "ddd DD MMMM, YYYY LT"
                )}
              </span>
            </p>
            <p className="text-lg">
              Last Treatment Date:{" "}
              <span className="text-2xl font-semibold">
                29th September, 2024
              </span>
            </p>

            <Divider variant="middle" orientation="horizontal" flexItem />
            {/* Medical History */}
            <div className="py-6 px-8 space-y-8 bg-white flex flex-col rounded-2xl">
              <h5 className="font-semibold text-2xl">Medical History</h5>

              {/* Card 1 */}
              <div className="space-y-3">
                <p className=" inline-block font-bold py-1 px-2 bg-gray-200 rounded-lg">
                  29th September, 2024 10:55 AM
                </p>
                <div className="border border-text rounded-xl p-3 space-y-4 ml-6">
                  <p className="text-xl">
                    Diagnosed with <span className="font-semibold">Asthma</span>
                  </p>
                  <p className="text-xl">
                    Prescribed with bronchodilators, inhaled corticosteroids,
                    and provided an asthma action plan for management of acute
                    exacerbations.{" "}
                  </p>
                </div>
              </div>
              <CustomButton
                variant="outlined"
                label="View Full History"
                startIcon={<OpenInNew />}
                classes={"self-end"}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Backdrop Forms */}
      <ModalForm
        show={false}
        handleClose={() => {}}
        title="Title"
        handleSubmit={() => {}}
      >
        <div>Content</div>
      </ModalForm>

      {/* Backdrop Dialog */}
      <CustomDialog
        open={false}
        handleClose={() => {}}
        title="Title"
        content={"Hello"}
        onAccept={() => {}}
        onCancel={() => {}}
      />

      {/* Backdrop Card */}
      <Backdrop open={false} onClick={() => {}}>
        <PatientCard
          variant="compact"
          patient={{
            fullName: "Jane Doe",
            age: 25,
            gender: "female",
            phone: "+91 8765409876",
            lastVisited: "12/12/2021",
          }}
        />
      </Backdrop>

      {/* Notification Snackbar */}
      <Snackbar
        open={false}
        autoHideDuration={6000}
        onClose={() => {}}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => {}} severity="success" variant="filled">
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Doctor;
