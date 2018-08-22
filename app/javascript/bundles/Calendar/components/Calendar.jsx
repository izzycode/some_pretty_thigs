import React from "react";
import dateFns from "date-fns";
import axios from "axios";
import Header from './Header';
import Days from './Days';
import Cells from './Cells';
import EventDialog from './EventDialog';
import FormDialog from './FormDialog';

const token = document.querySelector('meta[name="csrf-token"]')
                .getAttribute('content');

const headers = {
                  'X-Requested-With': 'XMLHttpRequest',
                  'X-CSRF-TOKEN':     token
                }

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    currentDate: new Date(),
    events: {},
    eventDialogOpen: false,
    selectedEvent: {},
    formDialogOpen: false,
    newEvent: {
      title: '',
      description: '',
      start_at: new Date(),
      end_at: new Date()
    }
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
    const { selectedEvent, currentMonth, events, formDialogOpen,
            newEvent, eventDialogOpen, currentDate } = this.state;
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
            handleDateClick={this.handleDateClick}
            monthStart={monthStart}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <EventDialog
          open={eventDialogOpen}
          selectedEvent={selectedEvent}
          handleClose={this.handleEventDialogClose}
          destroyEvent={this.destroyEvent}
        />
        <FormDialog
          open={formDialogOpen}
          newEvent={newEvent}
          handleClose={this.handleFormDialogClose}
          handleTitleChange={this.handleTitleChange}
          handleDescriptionChange={this.handleDescriptionChange}
          handleStartAtChange={this.handleStartAtChange}
          handleEndAtChange={this.handleEndAtChange}
          createEvent={this.createEvent}
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

  handleFormDialogClose = () => {
    this.setState({
      formDialogOpen: false,
      newEvent: {
        title: '',
        description: '',
        start_at: new Date(),
        end_at: new Date()
      }
    })
  }

  handleEventClick = (calendarEvent, clickEvent) => {
    clickEvent.stopPropagation();
    this.setState({
      eventDialogOpen: true,
      selectedEvent: calendarEvent
    })
  }

  handleDateClick = date => {
    let { newEvent } = this.state;
    let start_at = dateFns.parse(date);
    let end_at = dateFns.parse(date);
    start_at.setHours(12, 0);
    end_at.setHours(12, 0);
    newEvent.start_at = start_at;
    newEvent.end_at = end_at;
    this.setState({
      newEvent,
      formDialogOpen: true
    });
  }

  handleStartAtChange = time => {
    let { newEvent } = this.state;
    const hours = time.getHours();
    const minutes = time.getMinutes();
    newEvent.start_at.setHours(hours, minutes)
    this.setState({ newEvent });
  }

  handleEndAtChange = time => {
    let { newEvent } = this.state;
    const hours = time.getHours();
    const minutes = time.getMinutes();
    newEvent.end_at.setHours(hours, minutes)
    this.setState({ newEvent });
  }

  handleTitleChange = event => {
    let { newEvent } = this.state;
    newEvent.title = event.target.value;
    this.setState({ newEvent });
  }

  handleDescriptionChange = event => {
    let { newEvent } = this.state;
    newEvent.description = event.target.value;
    this.setState({ newEvent });
  }

  createEvent = newEvent => {
    const eventDateFormat = "YYYY-MM-DD";
    const eventFormattedDate = dateFns.format(newEvent.start_at, eventDateFormat);
    let { events } = this.state;
    axios.post(`/events.json`, newEvent, {headers: headers})
      .then((response) => {
        if(events[eventFormattedDate]){
          events[eventFormattedDate].push(response.data);
        }else{
          events[eventFormattedDate] = [response.data];
        }
        events[eventFormattedDate].sort((e1, e2) => {
          return e1.start_at > e2.start_at ? 1 : e1.start_at < e2.start_at ? -1 : 0
        })
        this.setState({
          events,
          formDialogOpen: false,
          newEvent: {
            title: '',
            description: '',
            start_at: new Date(),
            end_at: new Date()
          }
        })
      })
  }

  destroyEvent = event => {
    const eventDateFormat = "YYYY-MM-DD";
    const eventFormattedDate = dateFns.format(event.start_at, eventDateFormat);
    let { events } = this.state;
    axios.delete(`/events/${event.id}.json`, {headers: headers})
      .then((response) => {
        events[eventFormattedDate] = events[eventFormattedDate].filter((e) => {
          return e.id !== event.id
        })
        this.setState({
          events,
          eventDialogOpen: false
        })
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  resetMonth = month => {
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
