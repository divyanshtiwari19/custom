import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function CustomRadio({
  options,
  defaultValue = "",
  label = null,
  onChangeValue,
}) {
  return (
    <FormControl>
      <FormLabel
        sx={{
          "&": {
            color: "#71717a",
          },
          "&.Mui-focused": {
            color: "#f4f4f5",
          },
        }}
        id="demo-radio-buttons-group-label"
      >
        {label}
      </FormLabel>
      <RadioGroup
        onChange={(e) => onChangeValue(e.target.value)}
        sx={{
          "&": {
            display: "flex",
            flexDirection: "row !important",
            gap: "1rem",
          },
          "& .MuiFormControlLabel-root": {
            color: "#71717a",
          },
        }}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={defaultValue}
        name="radio-buttons-group"
      >
        {Array.isArray(options) &&
          options.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item?.value}
              control={<Radio />}
              label={item?.label}
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
}

export default CustomRadio;
