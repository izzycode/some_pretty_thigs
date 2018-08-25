import React from 'react';
import dateFns from "date-fns";
import { calendarBoundaries } from './calendarBoundaries';
import Cell from './Cell';

const Cells = props => {
  const { calendarStart,
          calendarEnd } = calendarBoundaries(props.currentDate);
  const weeks = [];
  let days = [];
  let day = calendarStart;
  while (day <= calendarEnd) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = dateFns.parse(day);
      days.push(cloneDay);
      day = dateFns.addDays(day, 1);
    }
    weeks.push(days);
    days = [];
  }
  return(
    <div className="body">
      {
        weeks.map((week, i) => {
          return(
            <div className="row" key={i}>
              {
                week.map((day, ii) => {
                  return(
                    <Cell
                      key={ii}
                      day={day}
                      {...props}
                    />
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  );
}

export default Cells
