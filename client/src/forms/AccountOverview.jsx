import { CustomTextField, CustomButton, IconButton } from "../components";
import { Edit, Save, LockReset } from "@mui/icons-material";
import { useState, useEffect } from "react";

// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../store/userSlice";
import { showAlert } from "../store/alertSlice";

// Services
import { updateUserProfile as updateUser } from "../services/userService";

const AccountOverview = () => {
  const [edit, setEdit] = useState(false); // Edit mode
  const dispatch = useDispatch();

  // User & profile from Redux store
  const { currentUser } = useSelector((state) => state.auth);
  const { clinicName, fullName, email, phone, age, gender } = useSelector(
    (state) => state.user.profile
  );

  // Form state
  const [form, setForm] = useState({
    fullName: fullName || "",
    clinicName: clinicName || "",
    email: email || "",
    phone: phone || "",
    age: age || "",
  });

  // Populate form with profile values when component mounts or profile changes
  useEffect(() => {
    setForm({
      fullName: fullName || "",
      clinicName: clinicName || "",
      email: email || "",
      phone: phone || "",
      age: age || "",
    });
  }, [fullName, clinicName, email, phone, age]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Save changes handler
  const handleSave = async () => {
    dispatch(updateUserProfile(form));
    console.log(form);

    // Update user profile
    await updateUser(currentUser.id, form)
      .then(() =>
        dispatch(
          showAlert({
            type: "success",
            message: "Profile updated succesfully.",
          })
        )
      )
      .catch(() =>
        dispatch(showAlert({ type: "error", message: "An error occured!" }))
      );

    setEdit(false); // Disabled edit mode after saving
  };

  return (
    <form className="flex flex-col gap-y-10">
      {edit ? (
        <p className="text-xs text-error">
          *You can now edit the fields below and save the changes to update your
          profile details.
        </p>
      ) : (
        <p className="text-xs text-primary">
          *Click the edit button to make changes to your profile details.
        </p>
      )}

      <div className="flex gap-x-6 ">
        <CustomTextField
          label="Full Name"
          value={form.fullName}
          name="fullName"
          onChange={handleChange}
          disabled={!edit}
        />
        <CustomTextField
          label="Clinic Name"
          value={form.clinicName}
          name="clinicName"
          onChange={handleChange}
          disabled={!edit}
        />
      </div>
      <div className="flex gap-x-6 items-end mx-2">
        <p className="font-normal text-xl w-full ">
          Gender:{" "}
          <span className="text-3xl font-light capitalize">{gender}</span>
        </p>
        <CustomTextField
          label="Age"
          value={String(form.age)}
          name="age"
          onChange={handleChange}
          disabled={!edit}
          classes="w-1/4"
        />
      </div>
      <div className="flex gap-x-6 ">
        <CustomTextField
          label="Email"
          value={form.email}
          name="email"
          onChange={handleChange}
          disabled={!edit}
        />
        <CustomTextField
          label="Phone Number"
          value={form.phone}
          name="phone"
          onChange={handleChange}
          disabled={!edit}
        />
      </div>

      {/* Form Actions */}
      <div className="flex flex-row-reverse gap-x-4 ">
        <CustomButton
          label="Save Changes"
          startIcon={<Save />}
          onClick={handleSave}
          disabled={!edit}
        />
        <CustomButton label="Reset Password" startIcon={<LockReset />} />
        <IconButton
          icon={<Edit />}
          color={edit ? "primary" : "default"}
          onClick={() => setEdit(!edit)}
        />
      </div>
    </form>
  );
};

export default AccountOverview;
