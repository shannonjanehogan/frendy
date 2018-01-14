import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import TimePicker from 'material-ui/TimePicker';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class CreateEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      time: "",
      address: "",
      size: "0_10",
    };
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleCreateEventClick = this.handleCreateEventClick.bind(this);
    this.onChange = (address) => this.setState({ address })
  }

  handleSizeChange = (event, index, value) => {
    const state = this.state;
    state.size = value;
    this.setState({ state });
  }

  handleCreateEventClick(event) {
    event.preventDefault();
      geocodeByAddress(this.state.address)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error))
  }

  render() {
      const inputProps = {
          value: this.state.address,
          onChange: this.onChange,
      }
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
            <TimePicker
                hintText="Event Time"
                onChange = {(event, newValue) => this.setState({ time: newValue }) }
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
            <br/>
            <PlacesAutocomplete inputProps={inputProps} />
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
