import { CustomButton, CustomTextField, CustomRadioGroup } from "../components";
import { Error, HowToReg, Stars } from "@mui/icons-material";
import { genders } from "../meta-data";

import { useState } from "react";

// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { closeForm } from "../store/formSlice";
import { showAlert } from "../store/alertSlice";

// Services
import { registerPatient } from "../services/patientService";

const PatientRegistration = () => {
  // Redux
  const dispatch = useDispatch();
  const { clinicName } = useSelector((state) => state.user.profile);

  // Form states
  const [form, setForm] = useState({
    clinicName: clinicName,
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
  });

  const validateForm = () => {
    // Form validation logic
    return (
      form.fullName.length > 3 &&
      form.age > 0 &&
      form.gender &&
      form.phone.length === 10
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(form);

    await registerPatient(form)
      .then(() => {
        dispatch(
          showAlert({
            message: "Patient registered successfully!",
            type: "success",
          })
        );
        dispatch(closeForm());
      })
      .catch(() => {
        dispatch(
          showAlert({
            message: "Failed to register patient. Please try again.",
            type: "error",
          })
        );
      })
      .finally(() => {
        setForm({
          clinicName: clinicName,
          fullName: "",
          age: "",
          gender: "",
          phone: "",
          email: "",
        });
      });
  };

  return (
    <form className="flex flex-col gap-y-8">
      <div className="flex gap-x-6">
        <CustomTextField
          type="text"
          label={"Name"}
          name={"fullName"}
          helperText={"(minimum 3 characters)"}
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <CustomTextField
          type="number"
          label={"Age"}
          name={"age"}
          classes={"w-1/3"}
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
      </div>
      <CustomRadioGroup
        title={"Gender"}
        options={genders}
        classes={"w-full"}
        value={form.gender}
        onChange={(e) =>
          setForm({
            ...form,
            gender: e.target.value,
          })
        }
      />
      <div className="flex gap-x-6">
        <CustomTextField
          type="number"
          label={"Phone Number"}
          name={"phone"}
          startAdornment="+91"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <CustomTextField
          type="email"
          label={"Email"}
          name={"email"}
          helperText={"(optional)"}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="flex items-center justify-between">
        {/* Errors */}
        <div className="flex gap-x-1.5 items-end text-sm text-error">
          {validateForm() ? null : (
            <>
              <Error />
              <p>Please ensure all fields are filled correctly.</p>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-x-3 flex-row-reverse">
          <CustomButton
            type="submit"
            label="Register & Generate Token"
            startIcon={<Stars />}
            disabled
          />
          <CustomButton
            type="submit"
            label="Register"
            variant="outlined"
            startIcon={<HowToReg />}
            onClick={handleRegister}
            disabled={!validateForm()}
          />
        </div>
      </div>
    </form>
  );
};

export default PatientRegistration;

// {"clinicName": "HealthCare Clinic", "fullName": "Jake", "age": 29, "gender": "male", "phone": "1220478299"}
