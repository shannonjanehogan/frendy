import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

class CreateEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      time: "",
      location: "",
      size: "0_10",
    };
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleCreateEventClick = this.handleCreateEventClick.bind(this);
  }

  handleSizeChange = (event, index, value) => {
    const state = this.state;
    state.size = value;
    this.setState({ state });
  }

  handleCreateEventClick(event) {
    event.preventDefault();
  }

  render() {
    const SizeSelectField =  (
      <SelectField
        style={{margin: 'auto', width: '100%'}}
        floatingLabelText="Event Size"
        value={this.state.size}
        onChange={this.handleSizeChange}
      >
        <MenuItem value={'0_10'} primaryText="0-10 people" />
        <MenuItem value={'10_30'} primaryText="10-30 people" />
        <MenuItem value={'30'} primaryText="30+ people" />
      </SelectField>
    );
    return (
      <div style={{margin: 'auto', width: '100%'}}>
        <div style={{margin: 'auto', width: '50%'}}>
           <TextField
             style={{margin: 'auto', width: '100%'}}
             hintText="Name"
             floatingLabelText="Name"
             onChange = {(event, newValue) => this.setState({ name: newValue }) }
           />
           <br/>
           <TextField
             style={{margin: 'auto', width: '100%'}}
             hintText="Time"
             floatingLabelText="Time"
             onChange = {(event, newValue) => this.setState({ time: newValue })}
           />
           <br/>
           {SizeSelectField}
           <br/>
           <RaisedButton
             label="Create Event"
             primary={true}
             style={{marginTop: '15px'}}
             onClick={(event) => this.handleCreateEventClick(event)}
           />
         </div>
      </div>
    );
  }
}

CreateEvent.propTypes = {
  actions: PropTypes.shape({
    debateSignup: PropTypes.func.isRequired,
  }).isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default CreateEvent;
