import { calendarBoundaries } from './calendarBoundaries';
import { csrfHeaders } from './csrfHeaders';
import React from "react";
import dateFns from "date-fns";
import axios from "axios";
import Header from './Header';
import Days from './Days';
import Cells from './Cells';
import EventDialog from './EventDialog';
import FormDialog from './FormDialog';

const today = new Date();

class Calendar extends React.Component {
  state = {
    month: calendarBoundaries(today).monthStart,
    events: {},
    eventDialogOpen: false,
    formDialogOpen: false,
    event: {
      title: '',
      description: '',
      start_at: new Date(),
      end_at: new Date()
    }
  }

  componentDidMount(){
    const {
            calendarStartYYYYMMDD,
            calendarEndYYYYMMDD
          } = calendarBoundaries(today);
    axios.get(`/events.json?start_date=${calendarStartYYYYMMDD}&end_date=${calendarEndYYYYMMDD}`)
      .then((response) => {
        this.setState({events: response.data});
      })
      .catch((error) => {
        console.log(error.response);
      })
  }

  render() {
    const { date, month, events, event,
            formDialogOpen, eventDialogOpen } = this.state;
    return (
      <div>
        <div className="calendar">
          <Header
            month={month}
            nextMonth={this.nextMonth}
            prevMonth={this.prevMonth}
          />
          <Days />
          <Cells
            events={events}
            currentDate={today}
            month={month}
            handleEventClick={this.handleEventClick}
            handleDateClick={this.handleDateClick}
          />
        </div>
        <EventDialog
          open={eventDialogOpen}
          event={event}
          handleClose={this.handleEventDialogClose}
          destroyEvent={this.destroyEvent}
        />
        <FormDialog
          open={formDialogOpen}
          event={event}
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
    const month = dateFns.addMonths(this.state.month, 1);
    this.resetMonth(month);
  }

  prevMonth = () => {
    const month = dateFns.subMonths(this.state.month, 1);
    this.resetMonth(month);
  }

  handleEventDialogClose = () => {
    this.setState({
      eventDialogOpen: false,
      event: {
        title: '',
        description: '',
        start_at: new Date(),
        end_at: new Date()
      }
    })
  }

  handleFormDialogClose = () => {
    this.setState({
      formDialogOpen: false,
      event: {
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
      event: calendarEvent
    })
  }

  handleDateClick = date => {
    let { event } = this.state;
    let start_at = dateFns.parse(date);
    let end_at = dateFns.parse(date);
    start_at.setHours(12, 0);
    end_at.setHours(12, 0);
    event.start_at = start_at;
    event.end_at = end_at;
    this.setState({
      event,
      formDialogOpen: true
    });
  }

  handleStartAtChange = time => {
    let { event } = this.state;
    const hours = time.getHours();
    const minutes = time.getMinutes();
    event.start_at.setHours(hours, minutes)
    this.setState({ event });
  }

  handleEndAtChange = time => {
    let { event } = this.state;
    const hours = time.getHours();
    const minutes = time.getMinutes();
    event.end_at.setHours(hours, minutes)
    this.setState({ event });
  }

  handleTitleChange = clickEvent => {
    let { event } = this.state;
    event.title = clickEvent.target.value;
    this.setState({ event });
  }

  handleDescriptionChange = clickEvent => {
    let { event } = this.state;
    event.description = clickEvent.target.value;
    this.setState({ event });
  }

  createEvent = event => {
    const eventDateFormat = "YYYY-MM-DD";
    const eventFormattedDate = dateFns.format(event.start_at, eventDateFormat);
    let { events } = this.state;
    axios.post(`/events.json`, event, {headers: csrfHeaders})
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
          event: {
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
    axios.delete(`/events/${event.id}.json`, {headers: csrfHeaders})
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
        this.setState({ month, events: response.data });
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
