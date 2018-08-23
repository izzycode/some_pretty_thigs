import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import dateFns from 'date-fns';
import TimeInput from 'material-ui-time-picker';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const FormDialog = props => {
  const { event, createEvent, open } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={props.handleClose}
      >
        <DialogTitle>New Event for {dateFns.format(event.start_at, "MMMM Do")}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="title"
            label="Title"
            type="text"
            value={event.title}
            onChange={props.handleTitleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            value={event.description}
            onChange={props.handleDescriptionChange}
            fullWidth
          />
          <FormControl
            fullWidth
            margin="dense"
          >
            <InputLabel htmlFor="start_at">Start</InputLabel>
            <TimeInput
              id="start_at"
              name="start_at"
              mode="12h"
              value={event.start_at}
              onChange={props.handleStartAtChange}
            />
          </FormControl>
          <FormControl
            fullWidth
            margin="dense"
          >
            <InputLabel htmlFor="end_at">End</InputLabel>
            <TimeInput
              id="end_at"
              name="end_at"
              mode="12h"
              value={event.end_at}
              onChange={props.handleEndAtChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={ () => { props.createEvent(event) } } color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}

export default FormDialog
