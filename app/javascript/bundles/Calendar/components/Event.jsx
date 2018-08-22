import React from 'react';

const Event = props => {
  const { event } = props;
  return(
    <div
      className="event"
      onClick={ () => { props.handleEventClick(event) } }
    >
      {event.title}
    </div>
  );
}

export default Event
