import React from "react";
import TextField from "@mui/material/TextField";

function CustomTextArea({
  id,
  label,
  type,
  registerOption,
  error,
  focus = false,
  defaultValue = "",
  rows,
  register = () => {},
  ...props
}) {
  return (
    <TextField
      {...props}
      multiline
      rows={rows}
      defaultValue={defaultValue}
      {...register(id, registerOption)}
      {...(error && {
        error: true,
        helperText: error?.message,
      })}
      className="!w-full"
      type={type}
      id={id}
      label={label}
      sx={{
        // for disabled input open
        "& .MuiInputBase-root.Mui-disabled": {
          "& > fieldset": {
            borderColor: "#27272a",
          },
          "&:hover fieldset": {
            borderColor: "#27272a",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#27272a",
          },
        },
        "& input.Mui-disabled": {
          color: "#ffffff",
        },
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "#ffffff",
        },

        // for disabled input close 

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

export default CustomTextArea;
