import React from 'react';
import dateFns from 'date-fns';

const Cell = props => {
  const { day, monthStart, currentDate, events } = props;
  const dateFormat = "D";
  const eventDateFormat = "YYYY-MM-DD";
  const formattedDate = dateFns.format(day, dateFormat);
  const eventFormattedDate = dateFns.format(day, eventDateFormat);
  return(
    <div
      className={`col cell ${
        !dateFns.isSameMonth(day, monthStart)
          ? "disabled"
          : dateFns.isSameDay(day, currentDate) ? "current" : ""
      }`}
    >
      {
        (events[eventFormattedDate] || []).map((event) => {
          return(
            <div
              key={event.id}
              className="event"
              onClick={ () => { props.handleOpen(event) } }
            >
              {event.title}
            </div>
          );
        })
      }
      <span className="number">{formattedDate}</span>
      <span className="bg">{formattedDate}</span>
    </div>
  );

}

export default Cell;
