import React, { useCallback, useEffect, useState } from "react";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

const CustomPhoneNumberInput = ({
  label,
  id,
  onChange,
  error,
  defaultValue,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = useCallback(
    (newValue, info) => {
      onChange(info.numberValue, matchIsValidTel(newValue));
      if (!matchIsValidTel(newValue)) {
        setErrorMessage("Please enter valid number");
      }
      setValue(newValue);
    },
    [errorMessage]
  );
  useEffect(() => {
    if (defaultValue && !matchIsValidTel(defaultValue)) {
      setErrorMessage("Please enter valid number");
    } else {
      setErrorMessage("Contact number is required");
    }
  }, [defaultValue]);
  return (
    <MuiTelInput
      error={error ? true : false}
      helperText={error && errorMessage && errorMessage}
      sx={{
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
      defaultCountry="IN"
      id={id}
      label={label}
      value={value}
      onChange={handleChange}
    />
  );
};

export default CustomPhoneNumberInput;
