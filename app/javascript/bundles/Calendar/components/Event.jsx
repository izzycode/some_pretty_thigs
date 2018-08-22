import React from 'react';

const Event = props => {
  const { event } = props;
  return(
    <div
      className="event"
      onClick={ (clickEvent) => { props.handleEventClick(event, clickEvent) } }
    >
      {event.title}
    </div>
  );
}

export default Event
