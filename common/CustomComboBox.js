import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useSWR from "swr";

export default function CustomComboSelect({
  //   placeholder,
  //   options,
  // defaultValue = {},
  //   onChange,
  error,
  errorMessage,
  renderField,
  renderField1,
  matchField,
  options,
  label,
  nolabel,
  onSearch,
  onSelect,
}) {
  return (
    <Autocomplete
      id="google-map-demo"
      getOptionLabel={(option) =>
        typeof option === "string"
          ? option
          : `${option?.[renderField]} ${
              renderField1 && "(" + option?.[renderField1] + ")"
            }`
      }
      // isOptionEqualToValue={(option, value) =>
      //   option[matchField] === value[matchField]
      // }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      noOptionsText={nolabel}
      onChange={(event, newValue) => {
        onSelect(newValue?.[matchField]);
      }}
      onInputChange={(event, newInputValue) => {
        onSearch(newInputValue);
      }}
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
          label={label}
          fullWidth
        />
      )}
      renderOption={(props, option, { selected }) => (
        <li key={option?.[matchField]} {...props}>
          {option?.[renderField]}{" "}
          {renderField1 && `(${option?.[renderField1]})`}
        </li>
      )}
    />
  );
}
