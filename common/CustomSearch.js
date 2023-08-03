import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { HiOutlineSearch } from "react-icons/hi";
export default function CustomSelect({
  id,
  label,
  registerOption,
  error,
  register,
  options,
  renderField,
  matchField,
  defaultValue = "",
}) {
  //   const [age, setAge] = useState("");
  const [value, setValue] = useState("");

  //   const handleChange = (event) => {
  //     setAge(event.target.value);
  //   };

  return (
    <div>
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
          {Array.isArray(options) &&
            options.map((option, index) => (
              <MenuItem key={index} value={option[matchField]}>
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
    </div>
  );
}
