import React, { Component } from 'react';
import dateFns from 'date-fns';

export const date = new Date();

export const calendarData = date => {
  const monthStart  = dateFns.startOfMonth(date);
  const monthEnd    = dateFns.endOfMonth(monthStart);

  const calendarStart = dateFns.startOfWeek(monthStart);
  const calendarEnd   = dateFns.endOfWeek(monthEnd);

  const formattedCalendarStart  = dateFns.format(calendarStart, "YYYY-MM-DD");
  const formattedCalendarEnd    = dateFns.format(calendarEnd, "YYYY-MM-DD");

  return({
    monthStart,
    monthEnd,
    calendarStart,
    calendarEnd,
    formattedCalendarStart,
    formattedCalendarEnd
  });
}

const DateContext = React.createContext();

export default DateContext
