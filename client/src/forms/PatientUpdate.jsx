import { CustomButton, CustomTextField } from "../components";
import { Delete, Save } from "@mui/icons-material";
import { useEffect, useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { closeForm } from "../store/formSlice";
import { showAlert } from "../store/alertSlice";

// Services
import { updatePatient, deletePatient } from "../services/patientService";

const PatientUpdate = () => {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
  });

  // Redux
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.form);

  useEffect(() => {
    setForm({
      fullName: data.fullName,
      age: data.age,
      gender: data.gender,
      phone: data.phone,
      email: data.email || "",
    });
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    await updatePatient(data._id, form)
      .then((res) => {
        dispatch(
          showAlert({
            message: res,
            type: "success",
          })
        );
        dispatch(closeForm());
      })
      .catch((error) => {
        dispatch(
          showAlert({
            message: error,
            type: "error",
          })
        );
      });
  };

  const handleDelete = async () => {
    await deletePatient(data._id)
      .then((data) => {
        dispatch(
          showAlert({
            message: data,
            type: "success",
          })
        );
        dispatch(closeForm());
      })
      .catch((error) => {
        dispatch(
          showAlert({
            message: error,
            type: "error",
          })
        );
      });
  };

  return (
    <form className="flex flex-col gap-y-10">
      <div className="flex gap-x-6">
        <CustomTextField
          type="text"
          label={"Name"}
          name={"fullName"}
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
      <p className="ml-2 text-lg">
        Gender:{" "}
        <span className="text-2xl font-semibold capitalize">{form.gender}</span>
      </p>
      <div className="flex gap-x-6">
        <CustomTextField
          label={"Phone Number"}
          startAdornment={"+91"}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <CustomTextField
          label={"Email"}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="flex items-center justify-end">
        {/* Actions */}
        <div className="flex gap-x-3 flex-row-reverse">
          <CustomButton
            type="submit"
            label="Save Changes"
            variant="filled"
            startIcon={<Save />}
            onClick={handleSubmit}
          />
          <CustomButton
            label="Delete"
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={handleDelete}
          />
        </div>
      </div>
    </form>
  );
};

export default PatientUpdate;
