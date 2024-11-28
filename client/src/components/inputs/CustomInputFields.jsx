import PropTypes from "prop-types";
import { TextField, FormControl, InputAdornment } from "@mui/material";
import { colors } from "../../meta-data";

export const CustomTextField = ({
  name,
  label,
  type,
  value,
  onChange,
  size = "medium",
  error,
  helperText,
  placeholder,
  startAdornment,
  endAdornment,
  disabled = false,
  classes,
}) => {
  return (
    <FormControl
      fullWidth
      sx={{
        "& .MuiInputBase-root": {
          backgroundColor: "white",
          borderRadius: "2.5rem",
          fontFamily: "inherit",
          "&:hover": {
            backgroundColor: "white",
          },
          "&.Mui-focused": {
            borderColor: colors.primary,
            "& .MuiFormLabel-root": {
              color: colors.primary,
              fontFamily: "inherit",
            },
          },
        },
        "& .MuiFormLabel-root": {
          fontFamily: "inherit", // Font for the label
        },
        "& .MuiInputLabel-root": {
          fontFamily: "inherit", // Font for the input label
        },
        "& .MuiFormHelperText-root": {
          fontFamily: "inherit", // Font for helper text
        },
      }}
    >
      <TextField
        name={name}
        className={classes}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        variant={"outlined"}
        size={size}
        error={error}
        helperText={helperText}
        placeholder={placeholder}
        disabled={disabled}
        multiline={type === "textarea" ? true : false}
        rows={type === "textarea" ? 4 : 1}
        InputProps={{
          startAdornment: startAdornment && (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ),
          endAdornment: endAdornment && (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

CustomTextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf([
    "text",
    "textarea",
    "password",
    "email",
    "number",
    "tel",
  ]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
  disabled: PropTypes.bool,
  classes: PropTypes.string,
};

// Radio Group
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormHelperText,
} from "@mui/material";

export const CustomRadioGroup = ({
  name,
  title,
  options,
  onChange,
  value,
  error,
  helperText,
  classes,
}) => {
  return (
    <FormControl
      component="fieldset"
      error={error}
      className={classes}
      name={name}
    >
      <FormLabel
        component="legend"
        sx={{
          fontFamily: "inherit",
          fontSize: "1rem",
          color: "text.primary",
        }}
      >
        {title}
      </FormLabel>
      <RadioGroup
        row
        aria-label={title}
        name={title}
        value={value}
        onChange={onChange}
        sx={{
          "& .MuiRadio-root": {
            color: "primary.main",
          },
          "& .MuiTypography-root": {
            fontFamily: "inherit",
          },
        }}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={<Radio />}
            label={option.label}
            sx={{
              "& .MuiTypography-root": {
                fontFamily: "inherit",
              },
            }}
          />
        ))}
      </RadioGroup>
      <FormHelperText sx={{ fontFamily: "inherit" }}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

CustomRadioGroup.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  classes: PropTypes.string,
};
