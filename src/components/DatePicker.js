import moment from "moment";
import React from "react";
import RCDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ value , onChange}) => {
    const today = new Date();
    return (
        <RCDatePicker
            dayClassName={date => moment().diff(date, 'days') > 0 ? 'disabled-date' : undefined}
            startDate={today}
            dateFormat="dd-MM-yyyy"
            selected={value || today}
            onChange={onChange}
        />
    );
};

export default DatePicker;