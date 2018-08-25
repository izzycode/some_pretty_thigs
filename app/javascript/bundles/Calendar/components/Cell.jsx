import React from 'react';
import dateFns from 'date-fns';
import DailyEvents from './DailyEvents';

const Cell = props => {
  const { day, currentDate, month, events } = props;
  const cellFormattedDate = dateFns.format(day, "D");
  const eventFormattedDate = dateFns.format(day, "YYYY-MM-DD");
  return(
    <div
      className={`col cell ${
        !dateFns.isSameMonth(day, month)
          ? "disabled"
          : dateFns.isSameDay(day, currentDate) ? "current" : ""
      }`}
      onClick={ () => { props.handleDateClick(day) }  }
    >
      <DailyEvents
        dailyEvents={events[eventFormattedDate] || []}
        {...props}
      />
      <span className="number">{cellFormattedDate}</span>
    </div>
  );

}

export default Cell;
