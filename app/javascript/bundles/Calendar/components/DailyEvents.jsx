import React from 'react';
import Event from './Event';

const DailyEvents = props => {
  const { dailyEvents } = props;
  return(
    <div className="events">
      {
        dailyEvents.map((calendarEvent) => {
          return(
            <Event
              key={calendarEvent.id}
              calendarEvent={calendarEvent}
              {...props}
            />
          );
        })
      }
    </div>
  );
}

export default DailyEvents
