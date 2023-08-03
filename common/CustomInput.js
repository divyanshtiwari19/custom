import React from "react";
import TextField from "@mui/material/TextField";
import { color } from "@mui/system";

function CustomInput({
  id,
  label,
  type,
  registerOption,
  error,
  register = () => {},
  focus = false,
  defaultValue = "",
  ...props
}) {
  return (
    <TextField
      {...props}
      defaultValue={defaultValue}
      {...(id === "password" && {
        focused: focus,
      })}
      {...register(id, registerOption)}
      {...(error && {
        error: true,
        helperText: error?.message,
      })}
      className="w-full"
      type={type}
      id={id}
      label={label}
      sx={{
        svg: { color: "#d4d4d8" },
        '& input[type="datetime-local"]::-webkit-calendar-picker-indicator': {
          filter:
            "invert(78%) sepia(66%) saturate(100%) hue-rotate(0deg) brightness(127%) contrast(100%) ",
        },
        "& .MuiFormLabel-root": {
          color: "#71717a",
        },
        "& label.Mui-focused": {
          color: "#f4f4f5",
        },
        "& .MuiInputBase-input": {
          color: "#f4f4f5",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#71717a",
          },

          "&:hover fieldset": {
            borderColor: "#71717a",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#a1a1aa",
          },
          "& .MuiInputBase-root": {
            color: "#71717a",
          },
        },

        "& .Mui-error": {
          color: "#F07575 !important",
          "& fieldset": {
            borderColor: "#F07575 !important",
          },
        },
      }}
    />
  );
}

export default CustomInput;
