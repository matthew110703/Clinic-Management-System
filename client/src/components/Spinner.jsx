import PropTypes from "prop-types";
import { Webhook } from "@mui/icons-material";
import { LinearProgress, Backdrop } from "@mui/material";

const Spinner = ({
  size = 32,
  color = "primary",
  disableLinearProgress = false,
}) => {
  return (
    <Backdrop
      open={true}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "white",
      }}
    >
      <div className="w-64 space-y-8">
        <Webhook
          color={color}
          sx={{
            fontSize: size,
            display: "block",
            margin: "auto",
          }}
          className="animate-spin"
        />
        {!disableLinearProgress && (
          <LinearProgress
            sx={{
              width: "100%",
              height: size / 10,
            }}
          />
        )}
      </div>
    </Backdrop>
  );
};

export default Spinner;

Spinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  disableLinearProgress: PropTypes.bool,
};
