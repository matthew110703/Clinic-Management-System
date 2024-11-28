import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NotFound } from "./pages";
import { lazy, Suspense } from "react";

import Test from "./pages/Test";
import withAuth from "./utils/withAuth";

// UI Components
import { Spinner, ModalForm, CustomDialog } from "./components";
import { Snackbar, Alert } from "@mui/material";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "./store/alertSlice";
import { closeForm } from "./store/formSlice";
import { closeDialog } from "./store/dialogSlice";

// Forms
import { renderForm } from "./forms";

// Lazy load the main components
const Home = lazy(() => import("./pages/Home"));
const Doctor = lazy(() => import("./pages/Doctor"));
const Receptionist = lazy(() => import("./pages/Receptionist"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const DashBoard = lazy(() => import("./pages/DashBoard"));
const Patients = lazy(() => import("./pages/Patients"));
const Tokens = lazy(() => import("./pages/Tokens"));

// const TestApp = withAuth(Test);
const AuthorizedDoctorView = withAuth(Doctor);
const AuthorizedReceptionistView = withAuth(Receptionist);

const App = () => {
  // Redux
  const dispatch = useDispatch();
  const {
    show,
    type: alertType,
    message,
  } = useSelector((state) => state.alert); // Alert state
  const { open, title, type: formType } = useSelector((state) => state.form); // Form state
  const dialog = useSelector((state) => state.dialog); // Dialog state

  return (
    <>
      <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/receptionist"
              element={<AuthorizedReceptionistView />}
            >
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="patients" element={<Patients />} />
              <Route path="tokens" element={<Tokens />} />
            </Route>
            <Route
              path="/doctor/dashboard"
              element={<AuthorizedDoctorView />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
      {/* Notification Snackbar */}
      <Snackbar
        open={show}
        autoHideDuration={6000}
        onClose={() => dispatch(clearAlert())}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={alertType} variant="filled">
          {message}
        </Alert>
      </Snackbar>
      {/* Backdrop Forms */}
      <ModalForm
        show={open}
        handleClose={() => dispatch(closeForm())}
        title={title}
      >
        {renderForm(formType)}
      </ModalForm>
      {/* Backdrop Dialog */}
      <CustomDialog
        open={dialog.show}
        title={dialog.title}
        content={dialog.content}
        onAccept={dialog.onAccept}
        onCancel={() => dispatch(closeDialog())}
        disableBackdropClick
      />
    </>
  );
};

export default App;
