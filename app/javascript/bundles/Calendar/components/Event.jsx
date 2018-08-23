import React from 'react';

const Event = props => {
  const { calendarEvent } = props;
  return(
    <div
      className="event"
      onClick={ (clickEvent) => { props.handleEventClick(calendarEvent, clickEvent) } }
    >
      {calendarEvent.title}
    </div>
  );
}

export default Event
