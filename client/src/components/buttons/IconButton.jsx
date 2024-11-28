import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { IconButton as Button, Tooltip } from "@mui/material";
import { colors } from "../../meta-data";

const IconButton = ({
  color,
  icon,
  size = "medium",
  onClick,
  to,
  disabled = false,
  styles,
  classes,
  toolTipText = "",
}) => {
  const StyledButton = styled(Button)({
    color: colors[color],
    backgroundColor: `${colors[color]}22`,
    padding:
      size === "small" ? "0.4rem" : size === "large" ? "1rem" : "0.75rem",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
    "&:hover": {
      backgroundColor: `${colors[color]}44`,
    },
  });

  return (
    <Tooltip title={toolTipText} arrow>
      <span>
        <StyledButton
          onClick={onClick}
          disabled={disabled}
          sx={styles}
          className={classes}
          href={to && to}
        >
          {icon}
        </StyledButton>
      </span>
    </Tooltip>
  );
};

export default IconButton;

IconButton.propTypes = {
  color: PropTypes.oneOf(Object.keys(colors)),
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  to: PropTypes.string,
  disabled: PropTypes.bool,
  styles: PropTypes.object,
  classes: PropTypes.string,
  toolTipText: PropTypes.string,
};
