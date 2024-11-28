import PropTypes from "prop-types";
import { memo } from "react";
import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CustomButton from "./buttons/CustomButton";

// Redux
import { useDispatch } from "react-redux";
import { showAlert } from "../store/alertSlice";

const CustomDialog = memo(
  ({
    open,
    title,
    content,
    onAccept,
    onCancel,
    acceptText = "Okay",
    cancelText = "Cancel",
    disableBackdropClick = false,
  }) => {
    // Redux
    const dispatch = useDispatch();

    const handleAccept = () => {
      onAccept();
      onCancel();
      dispatch(
        showAlert({
          message: "Action completed successfully",
          type: "success",
        })
      );
    };

    return (
      <Dialog
        open={open}
        onClose={disableBackdropClick ? () => {} : onCancel}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "20px",
            padding: "20px",
            width: "400px",
          },
        }}
      >
        <DialogTitle id="dialog-title" className="select-none">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description" className=" select-none">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton
            onClick={onCancel}
            variant="outlined"
            color="error"
            label={cancelText}
          />
          <CustomButton
            onClick={handleAccept}
            variant="filled"
            color="primary"
            label={acceptText}
          />
        </DialogActions>
      </Dialog>
    );
  }
);

CustomDialog.displayName = "CustomDialog";

export default CustomDialog;

CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  onAccept: PropTypes.func,
  onCancel: PropTypes.func,
  acceptText: PropTypes.string,
  cancelText: PropTypes.string,
  disableBackdropClick: PropTypes.bool,
};
