import {
  CustomButton,
  CustomTextField,
  CustomRadioGroup,
  Header,
  IconButton,
  Footer,
} from "../components";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import {
  AlternateEmailOutlined,
  ArrowBack,
  ArrowForward,
  Login,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { colors, genders } from "../meta-data";
import { useState } from "react";
import { aboutImg } from "../assets";
import { useNavigate } from "react-router-dom";

// Redux
import { register } from "../services/authService";
import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../store/loadingSlice";
import { showAlert } from "../store/alertSlice";

const steps = [
  "Register as",
  "Enter Clinic Details",
  "Personal Information",
  "Create Password",
];

const stepperStyles = {
  backgroundColor: "white",
  border: `2px solid ${colors.primary}`,
  padding: "1rem",
  borderRadius: "1.8rem",
};

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);

  // Form States
  const [role, setRole] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    phoneNumber: "",
    email: "",
  });
  const [password, setpassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validatePersonalDetails = () => {
    return (
      personalDetails.firstName.length > 0 &&
      personalDetails.lastName.length > 3 &&
      personalDetails.gender &&
      personalDetails.age > 0 &&
      personalDetails.phoneNumber.length === 10 &&
      personalDetails.email.includes("@") &&
      personalDetails.email.includes(".")
    );
  };

  const validatePassword = () => {
    return (
      password.newPassword.length >= 8 &&
      password.newPassword === password.confirmPassword &&
      checked
    );
  };

  const handleSubmit = async () => {
    const data = {
      fullName: `${personalDetails.firstName} ${personalDetails.lastName}`,
      role,
      clinicName,
      password: password.newPassword,
      email: personalDetails.email,
      phone: personalDetails.phoneNumber,
      gender: personalDetails.gender,
      age: personalDetails.age,
    };

    // Registration
    dispatch(startLoading());
    await register(data)
      .then(() => {
        dispatch(
          showAlert({
            message: "Registration Successful! Please Login to continue.",
            type: "success",
          })
        );
        navigate("/login");
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(stopLoading()));
  };

  return (
    <>
      <Header />
      <div className="mx-10 p-10 lg:flex items-start">
        <div className="space-y-0.5">
          <h2 className="text-5xl font-bold w-3/5">
            Complete your Registration To access our Portal.
          </h2>
          <p>
            - Ensure you have the necessary information ready before proceeding.
          </p>
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

        {/* Registration Form (stepper) */}
        <Stepper
          className="w-full"
          activeStep={activeStep}
          orientation="vertical"
        >
          {/* First Step (role) */}
          <Step sx={stepperStyles}>
            <StepLabel>
              <strong>
                {steps[0]} {activeStep > 0 && ` a ${role}`}
              </strong>
            </StepLabel>
            <StepContent sx={{ padding: "1rem" }}>
              <CustomRadioGroup
                title={"Specialization"}
                options={[
                  { label: "Doctor", value: "doctor" },
                  { label: "Receptionist", value: "receptionist" },
                ]}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <div className="flex items-end justify-end">
                <CustomButton
                  label="Next"
                  size="small"
                  disabled={role === ""}
                  startIcon={<ArrowForward />}
                  onClick={handleNext}
                />
              </div>
            </StepContent>

            {/* Second Step (clinic details) */}
          </Step>
          <Step sx={stepperStyles}>
            <StepLabel>
              <strong>{steps[1]}</strong>
            </StepLabel>
            <StepContent sx={{ padding: "1rem" }}>
              <CustomTextField
                label="Clinic Name"
                size="small"
                classes={"w-1/2"}
                helperText={"(Minimum 3 characters)"}
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
              />
              <div className="mt-3 flex justify-between">
                <CustomButton
                  variant="outlined"
                  label="Back"
                  size="small"
                  startIcon={<ArrowBack />}
                  onClick={handleBack}
                />
                <CustomButton
                  label="Next"
                  size="small"
                  disabled={clinicName.length < 3}
                  startIcon={<ArrowForward />}
                  onClick={handleNext}
                />
              </div>
            </StepContent>
          </Step>

          {/* Third Step (personal information) */}
          <Step sx={stepperStyles}>
            <StepLabel>
              <strong>{steps[2]}</strong>
            </StepLabel>
            <StepContent sx={{ padding: "1rem" }}>
              <p className="text-xs text-error mb-8">
                * All the fields are mandatory. Ensure to fill the right
                information to proceed.
              </p>
              <div className="space-y-8">
                <div className="flex gap-x-4">
                  <CustomTextField
                    label="First Name"
                    value={personalDetails.firstName}
                    onChange={(e) =>
                      setPersonalDetails({
                        ...personalDetails,
                        firstName: e.target.value,
                      })
                    }
                  />
                  <CustomTextField
                    label="Last Name"
                    helperText={"(Minimum 3 characters)"}
                    value={personalDetails.lastName}
                    onChange={(e) =>
                      setPersonalDetails({
                        ...personalDetails,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-x-4">
                  <CustomRadioGroup
                    title={"Gender"}
                    options={genders}
                    classes={"w-full"}
                    value={personalDetails.gender}
                    onChange={(e) =>
                      setPersonalDetails({
                        ...personalDetails,
                        gender: e.target.value,
                      })
                    }
                  />
                  <CustomTextField
                    label="Age"
                    type="number"
                    helperText={"years"}
                    classes={"w-32"}
                    value={personalDetails.age}
                    onChange={(e) =>
                      setPersonalDetails({
                        ...personalDetails,
                        age: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex gap-x-4">
                  <CustomTextField
                    label="Phone Number"
                    type="tel"
                    startAdornment={"+91"}
                    placeholder={"1234567890"}
                    value={personalDetails.phoneNumber}
                    onChange={(e) =>
                      setPersonalDetails({
                        ...personalDetails,
                        phoneNumber: String(e.target.value)
                          .trim()
                          .replace(/[^0-9]/g, "")
                          .slice(0, 10),
                      })
                    }
                  />
                  <CustomTextField
                    label="Email"
                    type="email"
                    placeholder={"example@gmail.com"}
                    startAdornment={<AlternateEmailOutlined />}
                    value={personalDetails.email}
                    onChange={(e) =>
                      setPersonalDetails({
                        ...personalDetails,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <CustomButton
                    variant="outlined"
                    label="Back"
                    size="small"
                    startIcon={<ArrowBack />}
                    onClick={handleBack}
                  />
                  <CustomButton
                    label="Next"
                    size="small"
                    startIcon={<ArrowForward />}
                    onClick={handleNext}
                    disabled={!validatePersonalDetails()}
                  />
                </div>
              </div>
            </StepContent>
          </Step>
          <Step sx={stepperStyles}>
            <StepLabel>
              <strong>{steps[3]}</strong>
            </StepLabel>
            <StepContent sx={{ padding: "1rem" }}>
              <div className="space-y-8">
                <CustomTextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  classes={"w-1/2"}
                  helperText={
                    "At least 8 characters. (A-Z, a-z, 0-9, special characters)"
                  }
                  endAdornment={
                    <IconButton
                      size="small"
                      icon={showPassword ? <Visibility /> : <VisibilityOff />}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  }
                  value={password.newPassword}
                  onChange={(e) =>
                    setpassword({ ...password, newPassword: e.target.value })
                  }
                />
                <CustomTextField
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  classes={"w-1/2"}
                  helperText={"Ensure your passwords match to proceed."}
                  value={password.confirmPassword}
                  onChange={(e) =>
                    setpassword({
                      ...password,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <div className="flex items-center">
                  <Checkbox
                    id="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                  <label htmlFor="checkbox">
                    I agree to the Terms and Conditions of the portal.
                  </label>
                </div>
                <div className="flex justify-between">
                  <CustomButton
                    variant="outlined"
                    label="Back"
                    size="small"
                    startIcon={<ArrowBack />}
                    onClick={handleBack}
                  />
                  <CustomButton
                    label="Register"
                    startIcon={
                      loading ? <CircularProgress size={16} /> : <Login />
                    }
                    disabled={!validatePassword() || loading}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </StepContent>
          </Step>
        </Stepper>
      </div>
      <Footer />
    </>
  );
};

export default Register;
