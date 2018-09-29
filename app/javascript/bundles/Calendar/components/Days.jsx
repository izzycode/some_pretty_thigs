import React from 'react';

const Days = () => {
  const days  = [ "sunday", "monday", "tuesday", "wednesday",
                  "thursday", "friday", "saturday" ];
  return(
    <div className="days row">
      {
        days.map((day) => {
          return(
            <div className="col col-center" key={day}>
              { day }
            </div>
          )
        })
      }
    </div>
  )
}

export default Days;
