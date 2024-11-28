import PropTypes from "prop-types";
import { memo } from "react";
import { CustomButton, IconButton } from "../components";
import {
  Close,
  Update,
  DescriptionOutlined,
  StarsRounded,
  Edit,
  Payment,
  DeleteOutlined,
} from "@mui/icons-material";

// Redux
import { useDispatch } from "react-redux";
import { showForm } from "../store/formSlice";
import { showDialog } from "../store/dialogSlice";
import { showCard } from "../store/backdropCardSlice";

// Services
import { generateToken } from "../services/patientService";
import { updateTokenStatus } from "../services/tokenService";
import { getPatientById } from "../services/patientService";

export const RenderActions = memo(({ params }) => {
  const dispatch = useDispatch();

  if (params.value === undefined) {
    return null;
  }

  const actionMap = {
    tokenUpdate: (
      <CustomButton
        type="button"
        variant="filled"
        label="Update"
        color="primary"
        size="small"
        startIcon={<Update />}
      />
    ),
    tokenCancel: (
      <IconButton
        icon={<Close />}
        color="error"
        size="small"
        toolTipText="Cancel the token"
        onClick={() => {
          const token = params.row;
          dispatch(
            showDialog({
              title: "Cancel Token",
              content: `Cancel the token for ${token.fullName}?`,
              onAccept: () => updateTokenStatus(token._id, "cancelled"),
              acceptText: "Cancel",
            })
          );
        }}
      />
    ),
    viewPatient: (
      <IconButton
        icon={<DescriptionOutlined />}
        color="primary"
        size="small"
        toolTipText="View Patient Details"
      />
    ),
    generateToken: (
      <IconButton
        icon={<StarsRounded />}
        color="primary"
        size="small"
        toolTipText="Generate Token"
        onClick={() => {
          const patient = params.row;
          dispatch(
            showDialog({
              title: "Generate Token",
              content: `Generate token for ${patient.fullName}?`,
              onAccept: () => generateToken(patient._id),
              acceptText: "Generate",
            })
          );
        }}
      />
    ),
    editPatient: (
      <IconButton
        icon={<Edit />}
        color="primary"
        size="small"
        toolTipText="Edit Patient Details"
        onClick={() =>
          dispatch(
            showForm({
              title: "Update Patient Details",
              type: "updatePatient",
              data: params.row,
            })
          )
        }
      />
    ),
    patientDetail: (
      <CustomButton
        type="button"
        variant="filled"
        label="Details"
        color="primary"
        size="small"
        startIcon={<DescriptionOutlined />}
        onClick={async () => {
          const token = params.row;
          await getPatientById(token.patient._id)
            .then((res) => {
              const patient = res;
              dispatch(showCard({ data: patient }));
            })
            .catch((error) => console.error(error));
        }}
      />
    ),
    generateBill: (
      <IconButton
        toolTipText="Generate Bill"
        color="primary"
        size="small"
        icon={<Payment />}
      />
    ),
    removeBill: (
      <CustomButton
        type="button"
        variant="outlined"
        label="Remove"
        color="error"
        size="small"
        startIcon={<DeleteOutlined />}
      />
    ),
  };

  const elements = params.value.map((action, idx) => (
    <span key={idx}>{actionMap[action]}</span>
  ));

  return (
    <div className="align-middle flex justify-center gap-x-1.5 items-center w-full">
      {elements}
    </div>
  );
});

RenderActions.displayName = "RenderActions";

RenderActions.propTypes = {
  params: PropTypes.object.isRequired,
};
