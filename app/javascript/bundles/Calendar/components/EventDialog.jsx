import React from 'react';
import dateFns from 'date-fns';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const EventDialog = props => {
  const { open, selectedEvent } = props;
  const dateFormat = "MMMM Do";
  const timeFormat = "h:mm a";
  return(
    <Dialog
      open={open}
      onClose={props.handleClose}
    >
      <DialogTitle>
        { selectedEvent.title } - {dateFns.format(selectedEvent.start_at, dateFormat)}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          { selectedEvent.description }
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        <DialogContentText>
          <b>Start: </b>{ dateFns.format(selectedEvent.start_at, timeFormat) }<br></br>
          <b>End: </b>{ dateFns.format(selectedEvent.end_at, timeFormat) }
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default EventDialog
