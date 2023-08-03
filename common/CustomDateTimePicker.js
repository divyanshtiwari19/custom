import React, { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import moment from "moment";

function CustomDateTimePicker() {
  const [value, setValue] = useState(moment());

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        error={true}
        renderInput={(props) => <TextField {...props} error={true} />}
        label="DateTimePicker"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
}

export default CustomDateTimePicker;
