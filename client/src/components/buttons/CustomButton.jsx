import PropTypes from "prop-types";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { colors } from "../../meta-data";

const CustomButton = ({
  type = "button",
  variant = "filled",
  color,
  size = "medium",
  label,
  onClick,
  to,
  disabled = false,
  styles,
  classes,
  startIcon,
  endIcon,
}) => {
  const StyledButton = styled(Button)(() => ({
    backgroundColor: variant === "filled" ? colors[color] : "transparent",
    color: variant === "filled" ? "white" : colors[color],
    border: !disabled && `0.125rem solid ${colors[color]}`,
    padding:
      size === "small"
        ? "0.25rem 1rem"
        : size === "large"
        ? "0.75rem 2rem"
        : "0.5rem 1.5rem",
    fontSize:
      size === "small" ? "0.75rem" : size === "large" ? "1rem" : "0.85rem",
    fontFamily: "inherit",
    fontWeight: 600,
    borderRadius: "2rem",
    boxShadow:
      "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19)",
    "&:hover": {
      backgroundColor:
        variant === "outlined" ? "rgba(0, 0, 0, 0.05)" : `${colors[color]}dd`,
    },
  }));

  return (
    <StyledButton
      type={type}
      variant={variant === "filled" ? "contained" : "outlined"}
      size={size}
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={styles}
      className={classes}
      href={to && to}
    >
      {label}
    </StyledButton>
  );
};

export default CustomButton;

CustomButton.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["outlined", "filled"]),
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf(Object.keys(colors)),
  classes: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  styles: PropTypes.object,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
};
