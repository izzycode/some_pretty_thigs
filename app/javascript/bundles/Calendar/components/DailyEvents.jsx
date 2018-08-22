import React from 'react';
import Event from './Event';

const DailyEvents = props => {
  const { dailyEvents } = props;
  return(
    <div>
      {
        dailyEvents.map((event) => {
          return(
            <Event key={event.id} event={event} {...props} />
          );
        })
      }
    </div>
  );
}

export default DailyEvents
