import React, { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import CustomInput from "./CustomInput";

function CustomMonthYearPicker(props) {
  
  const [value, setValue] = useState("");
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={["year", "month"]}
        label={props?.label}
        minDate={
          moment().local().format("YYYY-MM-") + moment().local().daysInMonth()
        }
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      
        renderInput={(params) => (
          <>
            <CustomInput {...params} {...props} />
          </>
        )}
      />
    </LocalizationProvider>
  );
}

export default CustomMonthYearPicker;
