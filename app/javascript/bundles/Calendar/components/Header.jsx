import React from 'react';
import dateFns from "date-fns";

const Header = props => {
  return(
    <div className="header row flex-middle">
      <div className="col col-start">
        <div className="icon" onClick={props.prevMonth}>
          chevron_left
        </div>
      </div>
      <div className="col col-center">
        <span>
          { dateFns.format(props.month, "YYYY MMMM") }
        </span>
      </div>
      <div className="col col-end" onClick={props.nextMonth}>
        <div className="icon">chevron_right</div>
      </div>
    </div>
  )
}

export default Header;
