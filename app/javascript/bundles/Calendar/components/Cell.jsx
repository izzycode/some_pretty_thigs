import React from 'react';
import dateFns from 'date-fns';
import DailyEvents from './DailyEvents';

const Cell = props => {
  const { day, monthStart, currentDate, events } = props;
  const dateFormat = "D";
  const formattedDate = dateFns.format(day, dateFormat);
  const eventDateFormat = "YYYY-MM-DD";
  const eventFormattedDate = dateFns.format(day, eventDateFormat);
  return(
    <div
      className={`col cell ${
        !dateFns.isSameMonth(day, monthStart)
          ? "disabled"
          : dateFns.isSameDay(day, currentDate) ? "current" : ""
      }`}
    >
      <DailyEvents dailyEvents={events[eventFormattedDate] || []} {...props} />
      <span className="number">{formattedDate}</span>
      <span className="bg">{formattedDate}</span>
    </div>
  );

}

export default Cell;
