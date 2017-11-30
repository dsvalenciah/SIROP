import React, { Component } from 'react';

import {blueGrey500, blueGrey300} from 'material-ui/styles/colors';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identification: null,
      name: null,
      phone: null,
      direction: null,
      email: null,
      identificationFieldError: null,
      nameFieldError: null,
      phoneFieldError: null,
      directionFieldError: null,
      emailFieldError: null,
    };
  }

  handleFinish(){
    this.props.onChange({
      identification: this.state.identification,
      name: this.state.name,
      phone: this.state.phone,
      direction: this.state.direction,
      email: this.state.email,
    });
  }

  componentWillReceiveProps() {
    if (this.props.user !== undefined) {
      this.setState({
        name: this.props.user.displayName,
        phone: this.props.user.phoneNumber,
        email: this.props.user.email,
      });
    }
  }

  identificationController(identification) {
    return "";
  }
  nameController(name) {
    return "";
  }
  phoneController(phone) {
    return "";
  }
  directionController(direction) {
    return "";
  }
  emailController(email) {
    return "";
  }

  handleIdentificationFieldChange(event) {
    this.setState(
      {identification: event.target.value},
      () => {this.setState({identificationFieldError: (
          this.identificationController(this.state.identification)
      )})}
    );
  }
  handleNameFieldChange(event) {
    this.setState(
      {name: event.target.value},
      () => {this.setState({nameFieldError: (
          this.nameController(this.state.name)
      )})}
    );
  }
  handlePhoneFieldChange(event) {
    this.setState(
      {phone: event.target.value},
      () => {this.setState({phoneFieldError: (
          this.phoneController(this.state.phone)
      )})}
    );
  }
  handleDirectionFieldChange(event) {
    this.setState(
      {direction: event.target.value},
      () => {this.setState({directionFieldError: (
          this.directionController(this.state.direction)
      )})}
    );
  }
  handleEmailFieldChange(event) {
    this.setState(
      {email: event.target.value},
      () => {this.setState({emailFieldError: (
          this.emailController(this.state.email)
      )})}
    );
  }

  render() {
    const actions = [
      <RaisedButton
        label="Cancelar"
        onClick={() => this.props.onChange(null)}
      />,
      <RaisedButton
        label="Ok"
        onClick={this.handleFinish.bind(this)}
      />,
    ];

    return(
      <Dialog
        title="Es tu primera vez por aquí y debes registrarte!"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
        bodyStyle={{background: blueGrey300}}
        titleStyle={{background: blueGrey500}}
        actionsContainerStyle={{background: blueGrey500}}
      >
        <TextField
          hintText="Escriba aquí su cedula"
          floatingLabelText="Cedula"
          fullWidth={true}
          errorText={this.state.identificationFieldError}
          onChange={this.handleIdentificationFieldChange.bind(this)}
        />
        <TextField
          hintText="Escriba aquí su nombre"
          floatingLabelText="Nombre"
          fullWidth={true}
          defaultValue={this.props.user.displayName}
          errorText={this.state.nameFieldError}
          onChange={this.handleNameFieldChange.bind(this)}
        />
        <TextField
          hintText="Escriba aquí su telefono"
          floatingLabelText="Telefono"
          fullWidth={true}
          defaultValue={this.props.user.phoneNumer}
          errorText={this.state.phoneFieldError}
          onChange={this.handlePhoneFieldChange.bind(this)}
        />
        <TextField
          hintText="Escriba aquí su direccion"
          floatingLabelText="Dirección"
          fullWidth={true}
          errorText={this.state.directionFieldError}
          onChange={this.handleDirectionFieldChange.bind(this)}
        />
        <TextField
          hintText="Escriba aquí su correo"
          floatingLabelText="Correo"
          fullWidth={true}
          defaultValue={this.props.user.email}
          errorText={this.state.emailFieldError}
          onChange={this.handleEmailFieldChange.bind(this)}
        />
      </Dialog>
     )
   };
}

export default UserInput;