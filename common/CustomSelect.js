import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CustomSelect({
  id,
  label,
  registerOption,
  error,
  register = () => {},
  options,
  renderField,
  matchField,
  defaultValue = "",
  renderData,
  onChangeAction,
}) {
  //   const [age, setAge] = useState("");
  const [value, setValue] = useState("");

  //   const handleChange = (event) => {
  //     setAge(event.target.value);
  //   };
  useEffect(() => {
    setValue(value);
    onChangeAction && onChangeAction(value);
  }, [value]);

  return (
    <FormControl
      className="!w-full"
      // {...(error && {
      //   error: true,
      // })}
      error={error && !value ? true : false}
    >
      <InputLabel
        sx={{
          "&.MuiFormLabel-root": {
            color: "#71717a",
          },
          "& label.Mui-focused": {
            color: "#f4f4f5",
          },
          "&.Mui-error": {
            color: "#F07575 !important",
          },
        }}
        id={id}
      >
        {label}
      </InputLabel>
      <Select
        {...register(id, registerOption)}
        labelId={id}
        id={id}
        label={label}
        defaultValue={defaultValue}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          "& label.Mui-focused": {
            color: "#f4f4f5",
          },
          "& .MuiInputBase-input": {
            color: "#f4f4f5",
          },
          "& .MuiSvgIcon-root": {
            color: "#eee",
          },
          "&.MuiOutlinedInput-root": {
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

          "&.Mui-error": {
            "& fieldset": {
              borderColor: "#F07575 !important",
            },
          },
        }}
      >
        <MenuItem value="">{label}</MenuItem>
        {renderData
          ? renderData
          : Array.isArray(options) &&
            options.map((option, index) => (
              <MenuItem
                key={index}
                value={matchField === "index" ? index : option[matchField]}
              >
                {option[renderField]}
              </MenuItem>
            ))}
      </Select>
      <FormHelperText
        sx={{
          "&.Mui-error": {
            color: "#F07575 !important",
          },
        }}
      >
        {error && !value && error?.message}
      </FormHelperText>
    </FormControl>
  );
}
