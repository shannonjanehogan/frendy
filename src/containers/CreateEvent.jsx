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
    };
    this.handleDebatePreferenceChange = this.handleDebatePreferenceChange.bind(this);
    this.handleCreateEventClick = this.handleCreateEventClick.bind(this);
  }

  handleDebatePreferenceChange = (event, index, value) => {
    const state = this.state;
    state.debater_preference = value;
    this.setState({ state });
  }

  handleCreateEventClick(event) {
    event.preventDefault();
    this.props.actions.debateSignup(this.state);
  }

  render() {
    const debatePreferenceSelectField =  (
      <SelectField
        style={{margin: 'auto', width: '100%'}}
        floatingLabelText="Debate Preference"
        value={this.state.debater_preference}
        onChange={this.handleDebatePreferenceChange}
      >
        <MenuItem value={'debate'} primaryText="Debate" />
        <MenuItem value={'judge'} primaryText="Judge" />
        <MenuItem value={'debate_or_judge'} primaryText="Indifferent" />
      </SelectField>
    );
    return (
      <div style={{margin: 'auto', width: '100%'}}>
        <div style={{margin: 'auto', width: '50%'}}>
           <TextField
             style={{margin: 'auto', width: '100%'}}
             hintText="Enter your name"
             floatingLabelText="Name"
             onChange = {(event, newValue) => this.setState({ name: newValue }) }
           />
           <br/>
           <TextField
             style={{margin: 'auto', width: '100%'}}
             hintText="Enter your partner preference"
             floatingLabelText="Partner Preference"
             onChange = {(event, newValue) => this.setState({ partner_preference: newValue })}
           />
           <br/>
           {debatePreferenceSelectField}
           <br/>
           <RaisedButton
             label="Sign Up to Debate"
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
