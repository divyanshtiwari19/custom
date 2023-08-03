import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function CustomMultiselect({
  id = "multiselect",
  placeholder,
  options,
  defaultValue = [],
  onChange,
  error,
  errorMessage,
  renderField,
  matchField,
  renderData,
  isOptionEqualToValue,
  getOptionLabel,
  renderOption,
  ...props
}) {
  const [val, setVal] = useState([]);

  useEffect(() => {
    if (Array.isArray(defaultValue) && defaultValue.length > 0) {
      setVal(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Autocomplete
      {...props}
      fullWidth
      sx={{
        width: "100% !important",
        "& .MuiFormLabel-root": {
          color: "#71717a",
        },
        "& label.Mui-focused": {
          color: "#f4f4f5",
        },
        "& fieldset.Mui-focused": {
          color: "#f4f4f5",
        },
        "& .MuiChip-root": {
          background: "#3f3f46",
          color: "#e5e7eb",
          "& .MuiSvgIcon-root": {
            color: "#d4d4d8",
          },
          "& .MuiSvgIcon-root:hover": {
            color: "#e4e4e7",
          },
        },
        "& .MuiAutocomplete-input": {
          color: "#a1a1aa",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#71717a",
          },
          "&:hover fieldset": {
            borderColor: "#71717a",
          },
        },
      }}
      onChange={(e, val) => {
        onChange(val);
        setVal(val);
      }}
      multiple
      id={id}
      options={options}
      disableCloseOnSelect
      // defaultValue={defaultValue}
      value={val}
      isOptionEqualToValue={
        isOptionEqualToValue
          ? isOptionEqualToValue
          : (option, value) => option[matchField] === value[matchField]
      }
      getOptionLabel={
        getOptionLabel ? getOptionLabel : (option) => option[renderField]
      }
      renderOption={
        renderOption
          ? renderOption
          : (props, option, { selected }) => (
              <li {...props}>{option[renderField]}</li>
            )
      }
      renderInput={(params) => (
        <TextField
          error={error}
          helperText={error && errorMessage && errorMessage}
          sx={{
            "& .MuiAutocomplete-popper": {
              color: "black !important",
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

            "& .MuiChip-label": {
              color: "#f4f4f5",
            },
            "& .MuiSvgIcon-root ": {
              color: "white",
            },
          }}
          {...params}
          label={placeholder}
          placeholder={placeholder}
        />
      )}
    />
  );
}
