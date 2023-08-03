import React, { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import moment from "moment";
import CustomInput from "./CustomInput";

function CustomYearPicker(props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (props?.defaultValue) {
      setValue(props?.defaultValue);
    }
  }, [props?.defaultValue]);
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        views={["year"]}
        label={props?.label}
        minDate={moment("2010-08-18T21:11:54").format("YYYY")}
        value={value}
        onChange={(newValue) => {
          props.onDateChange &&
            props.onDateChange(moment(newValue).format("YYYY"));
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

export default CustomYearPicker;
