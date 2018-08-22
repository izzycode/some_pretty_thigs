import React from "react";
import dateFns from "date-fns";
import axios from "axios";
import Header from './Header';
import Days from './Days';
import Cells from './Cells';
import EventDialog from './EventDialog';

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    currentDate: new Date(),
    events: {},
    eventDialogOpen: false,
    selectedEvent: {}
  }

  componentDidMount(){
    const { currentMonth } = this.state;
    const { formattedStartDate, formattedEndDate } = this.getMonthConsts(currentMonth);
    axios.get(`/events.json?start_date=${formattedStartDate}&end_date=${formattedEndDate}`)
      .then((response) => {
        this.setState({events: response.data});
      })
      .catch((error) => {
        console.log(error.response);
      })
  }

  render() {
    const { selectedEvent, currentMonth, events, eventDialogOpen, currentDate } = this.state;
    const { startDate, endDate, monthStart } = this.getMonthConsts(currentMonth);
    return (
      <div>
        <div className="calendar">
          <Header
            nextMonth={this.nextMonth}
            prevMonth={this.prevMonth}
            currentMonth={currentMonth}
          />
          <Days
            currentMonth={currentMonth}
          />
          <Cells
            currentDate={currentDate}
            currentMonth={currentMonth}
            selectedEvent={selectedEvent}
            events={events}
            handleEventClick={this.handleEventClick}
            monthStart={monthStart}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <EventDialog
          open={eventDialogOpen}
          selectedEvent={selectedEvent}
          handleClose={this.handleEventDialogClose}
        />
      </div>
    );
  }

  nextMonth = () => {
    const month = dateFns.addMonths(this.state.currentMonth, 1);
    this.resetMonth(month);
  }

  prevMonth = () => {
    const month = dateFns.subMonths(this.state.currentMonth, 1);
    this.resetMonth(month);
  }

  handleEventDialogClose = () => {
    this.setState({ eventDialogOpen: false })
  }

  handleEventClick = event => {
    this.setState({
      eventDialogOpen: true,
      selectedEvent: event
    })
  }

  resetMonth = (month) => {
    const { formattedStartDate, formattedEndDate } = this.getMonthConsts(month);
    axios.get(`/events.json?start_date=${formattedStartDate}&end_date=${formattedEndDate}`)
      .then((response) => {
        this.setState({currentMonth: month, events: response.data});
      })
      .catch((error) => {
        console.log(error.response);
      })
  }

  getMonthConsts = month => {
    const monthStart = dateFns.startOfMonth(month);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "YYYY-MM-DD";
    const formattedStartDate = dateFns.format(startDate, dateFormat);
    const formattedEndDate = dateFns.format(endDate, dateFormat);
    return { monthStart, startDate, endDate, formattedStartDate, formattedEndDate }
  }

}

export default Calendar;
