import React, { Component } from 'react';

import {grey900, grey500, blueGrey500, blueGrey700, blueGrey300} from 'material-ui/styles/colors';

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
          primaryText="Añadir reporte"
          onClick={this.props.onReportClick.bind(this)}
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

class userInput extends Component {
  render() {
    return(
      <Dialog
        title="Información de registro"
      >
        <TextField
            hintText="Número celular"
            floatingLabelText="celular"
            fullWidth={true}
        />
      </Dialog>
     )
   };
}

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


class App extends Component {
  constructor() {
    super();
    this.firebaseService = new FirebaseService();
    this.state = {
      user: null,
      dataInputOpen: false,
      existentUser: false
      data: null
    };
  }


  userExists() {
   if (this.state.user !== null)
    var temporal = this.firebaseService.getUserByUid(this.state.user.uid)
    if (temporal !== undefined) {
     this.setState({existentUser: true})
    }
  }

  componentWillMount(){
   this.firebaseService.getUser(
     (user) => this.setState(
       {user: user},
       () => {this.userExists()}
     )
   );
  }

  handleObjectDataInputChange(data){
    this.setState({
      dataInputOpen: !this.state.dataInputOpen,
      data: data
    }, () => {console.log(this.state.data?"Ok":"Cancel")})
  }

  loginButton(){
    return (
      <div>
        <AppBar
          title={this.state.user?this.state.user.displayName:<p></p>}
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

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <div>
          {this.loginButton()}
          {this.state.user?(
            <div>
              <p>{this.state.user.email}</p>
              <ObjectDataInput
                onChange={(data) => {this.handleObjectDataInputChange(data)}}
                visible={this.state.dataInputOpen}
                user={this.state.user}
              />
            </div>
          ):(
            <p>t</p>
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
