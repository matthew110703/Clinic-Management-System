import {
  Header,
  Footer,
  CustomButton,
  CustomTextField,
  CustomLink,
  IconButton,
} from "../components";
import { aboutImg } from "../assets";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TripOrigin,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  HealthAndSafetyOutlined,
  Error,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { jwtDecode } from "jwt-decode";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../store/authSlice";
import { startLoading, stopLoading } from "../store/loadingSlice";
import { login } from "../services/authService";
import { showAlert } from "../store/alertSlice";

const Login = () => {
  const [activeTab, setActiveTab] = useState("doctor");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Input States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Redux
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.loading);

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to Dashboard
      if (activeTab === "doctor" && currentUser.role === "doctor") {
        navigate("/doctor/dashboard");
      } else if (
        activeTab === "receptionist" &&
        currentUser.role === "receptionist"
      ) {
        navigate("/receptionist/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [activeTab, currentUser?.role, isAuthenticated, navigate]);

  const validateForm = () => {
    return email.length > 0 && password.length >= 8 && email.includes("@");
  };

  const handleLogin = async () => {
    // Validate Form
    if (!validateForm()) {
      setError("Please enter valid email and password.");
      return;
    }

    dispatch(startLoading());
    // Login
    await login(email, password)
      .then((data) => {
        const { token } = data;
        const user = jwtDecode(token);
        if (user.role !== activeTab) {
          setError("Invalid Role. Please select the correct role.");
          return;
        }
        dispatch(authenticate({ isAuthenticated: true, user, token }));
        localStorage.setItem("token", token);
        dispatch(showAlert({ type: "success", message: "Login Successful." }));
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
    dispatch(stopLoading());
  };

  return (
    <>
      <Header />
      <div className="lg:flex items-center justify-around p-10 m-10 gap-x-6">
        <div className="basis-1/3 space-y-0.5">
          <h2 className="text-5xl font-bold">
            Login to your account to access the dashboard.
          </h2>
          <p>
            - Your information will be kept confidential and secure at all
            times.
          </p>
          <img
            src={aboutImg}
            alt="Staff Image"
            className="object-contain"
            width={640}
          />
        </div>
        {/* Login Form  */}
        <div
          style={{
            width: 720,
            minHeight: 350,
          }}
          className="flex flex-col gap-y-8 p-6 shadow-lg border-4 border-primary rounded-3xl"
        >
          {/* Tabs */}
          <div className="flex w-1/2 mx-auto mb-4 gap-4">
            <CustomButton
              label="Doctor"
              size="large"
              variant={activeTab === "doctor" ? "filled" : "outlined"}
              startIcon={activeTab === "doctor" ? <TripOrigin /> : null}
              onClick={() => setActiveTab("doctor")}
            />
            <CustomButton
              label="Receptionist"
              size="large"
              variant={activeTab === "receptionist" ? "filled" : "outlined"}
              startIcon={activeTab === "receptionist" ? <TripOrigin /> : null}
              onClick={() => setActiveTab("receptionist")}
            />
          </div>
          {/* Form */}
          <CustomTextField
            label={"Email"}
            value={email}
            onChange={(e) => setEmail(String(e.target.value).trim())}
          />
          <CustomTextField
            type={showPassword ? "text" : "password"}
            label={"Password"}
            endAdornment={
              <IconButton
                size="small"
                icon={showPassword ? <Visibility /> : <VisibilityOff />}
                onClick={() => setShowPassword(!showPassword)}
              />
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            {/* Error */}
            {error && (
              <div className="flex gap-x-1 items-center justify-center text-sm text-error">
                <Error sx={{ fontSize: "20px" }} />
                <span>{error}.</span>
              </div>
            )}

            {/* Buttons */}
            <div className="flex  mx-2 justify-between gap-x-4">
              <CustomLink to="#" classes={"underline"}>
                Forgot Password?
              </CustomLink>
              <CustomButton
                label="Login"
                color="primary"
                startIcon={
                  !loading ? <LoginIcon /> : <CircularProgress size={16} />
                }
                onClick={handleLogin}
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex gap-x-2 items-center justify-center">
            <HealthAndSafetyOutlined className="text-primary" />
            <p className="text-sm">
              Your credentials are encrypted and fully secure.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
