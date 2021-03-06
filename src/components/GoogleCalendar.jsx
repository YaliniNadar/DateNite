/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { BsCalendarPlus } from 'react-icons/bs';
import showToast, { TOAST_ERROR, TOAST_SUCCESS } from '../utils/toastHelper';
import './Comp.css';

function GoogleCalendar(props) {
  const [dateTime, setDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  function dateTimeHandler(e) {
    setDateTime(e.toISOString());
    console.log(dateTime);
    e.setHours(e.getHours() + 1);
    setEndDateTime(e.toISOString());
    console.log(endDateTime);
  }

  function createCalendarEvent() {
    const TOKEN = localStorage.getItem('accessToken');
    fetch('/add_to_calendar', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          start: dateTime,
          end: endDateTime,
          token: TOKEN,
          place: props.place,
        },
      ),
    }).then((response) => console.log(response.json()));
  }

  function buttonHandler() {
    if (dateTime == null) {
      showToast('No date entered', TOAST_ERROR);
    } else {
      createCalendarEvent();
      showToast(`${dateTime} added to calendar`, TOAST_SUCCESS);
    }
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="Buttons">
          <DateTimePicker
            renderInput={(text) => <TextField {...text} />}
            label="Enter date"
            value={dateTime}
            inputformat="yyyy-MM-dd HH:mm:ss"
            onChange={(e) => dateTimeHandler(e)}
          />
        </div>
        <div className="Calendar">
          <BsCalendarPlus color="blue" type="button" onClick={() => buttonHandler()}>
            Add to google calendar
          </BsCalendarPlus>
        </div>
      </LocalizationProvider>
    </div>
  );
}

export default GoogleCalendar;
