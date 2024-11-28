import PropTypes from "prop-types";
import { Modal } from "@mui/material";
import IconButton from "./buttons/IconButton";
import { Close } from "@mui/icons-material";

const ModalForm = ({ show, handleClose, title, children }) => {
  return (
    <Modal open={show} onClose={handleClose} aria-labelledby="modal-title">
      <div className="h-screen flex flex-col justify-center items-center">
        <div
          style={{
            width: "90%",
            maxWidth: "1000px",
            minHeight: "500px",
          }}
          className="bg-white p-8 rounded-3xl space-y-8 border-4 border-primary"
        >
          <div className="flex justify-between items-center">
            <h2 id="modal-title" className="text-3xl font-semibold">
              {title}
            </h2>
            <IconButton
              icon={<Close />}
              toolTipText="Close Form"
              onClick={handleClose}
            />
          </div>

          {/* Render main content */}
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default ModalForm;

ModalForm.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
