import React, { Component } from 'react';

import {grey900, grey500, blueGrey500, blueGrey700, blueGrey300} from 'material-ui/styles/colors';

import RaisedButton from 'material-ui/RaisedButton';
import Reorder from 'material-ui/svg-icons/action/reorder';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';

import ObjectDataInput from './components/ObjectDataInput';
import RecordList from './components/RecordList';

import _ from 'lodash';

import FirebaseService from './services/firebase';

const muiTheme = getMuiTheme({
  raisedButton: {
    color: grey900,
    textColor: blueGrey300,
    primaryColor: grey900,
    primaryTextColor: grey900,
    secondaryColor: grey900,
    secondaryTextColor: grey900,
  },
  radioButton: {
    checkedColor: grey900,
  },
  palette: {
    textColor: grey900,
  },
  appBar: {
    height: 50,
    color: blueGrey500
  },
  tableHeader: {
    borderColor: grey900,
  },
  table: {
    backgroundColor: blueGrey300,
  },
  tableHeaderColumn: {
    textColor: grey900,
  },
  iconMenu: {
    color: grey500,
    backgroundColor: grey500,
  },
  textField: {
    textColor: grey900,
    hintColor: grey900,
    floatingLabelColor: grey900,
    focusColor: blueGrey500,
  }
});

class Logged extends Component {
  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><Reorder /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem
          primaryText="Sign out"
          onClick={this.props.onSesionChange.bind(this)}
        />
        <MenuItem
          primaryText="Añadir objeto"
          onClick={this.props.onReportClick.bind(this)}
        />
        <MenuItem
          primaryText="Buscar objeto"
        />
      </IconMenu>
    );
  }
}

class Login extends Component {
  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><Reorder /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Log In" onClick={this.props.onSesionChange.bind(this)}/>
      </IconMenu>
    )
  };
}

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
      }, () => {console.log(this.state)});
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

class App extends Component {
  constructor() {
    super();
    this.firebaseService = new FirebaseService();
    this.state = {
      user: null,
      dataInputOpen: false,
      userRegistered: false,
      userInputOpen: true,
      fetchingData: true,
      data: null
    };
  }

  userExists() {
    if (this.state.user) {
      this.firebaseService.getUserByUid(
        this.state.user.uid,
        (user) => {this.setState({
          userRegistered: user !== null
        }, () => {this.setState({fetchingData: false})})}
      );
    } else {
      this.setState({fetchingData: false});
    }
  }

  componentWillMount(){
    this.firebaseService.getUser((user) => this.setState(
      {user: user},
      () => {this.userExists()}
    ));
  }

  handleObjectInputChange(objectData){
    this.setState({
      dataInputOpen: !this.state.dataInputOpen,
      objectData: objectData
    }, () => {console.log(this.state.data?"Ok":"Cancel")})
  }

  loginButton(){
    return (
      <div>
        <AppBar
          title={this.state.user && this.state.user.displayName}
          iconElementLeft={
            this.state.user?(
              <Avatar src={this.state.user.photoURL} />
            ) : (
              <p>Auditor Software</p>
            )
          }
          iconElementRight={
            this.state.user?(
              <Logged
                onSesionChange={this.firebaseService.handleLogout}
                onReportClick={() => {this.setState({dataInputOpen: true});}}
              />
            ) : (
              <Login onSesionChange={this.firebaseService.handleAuth}/>
            )
          }
        />
      </div>
    );
  }

  handleUserRegisterChange(){
    if (this.state.userData) {
      this.firebaseService.setUser(this.state.user.uid, this.state.userData);
    } else {
      this.firebaseService.handleLogout();
    }
  }

  handleUserInputChange(userData) {
    this.setState({
      userInputOpen: !this.state.userInputOpen,
      userData: userData,
      userInputOpen: userData === null
    }, () => {this.handleUserRegisterChange()})
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <div>
          {this.loginButton()}
          {this.state.fetchingData?(
              <center><CircularProgress
                size={500}
                thickness={8}
                color={blueGrey700}
              /></center>
            ) : (
              this.state.user && this.state.userRegistered?(
                <div>
                  <ObjectDataInput
                    onChange={(objectData) => {
                      this.handleObjectInputChange(objectData)
                    }}
                    open={this.state.dataInputOpen}
                    user={this.state.user}
                  />
                </div>
              ):(
                this.state.user && (
                  <UserInput
                    open={this.state.userInputOpen}
                    onChange={
                      (userData) => {this.handleUserInputChange(userData)
                    }}
                    user={this.state.user}
                  />
                )
              )
            )
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
