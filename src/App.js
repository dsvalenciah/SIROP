import React, { Component } from 'react';

import {grey900, grey500, blueGrey500, blueGrey700, blueGrey300} from 'material-ui/styles/colors';

import Reorder from 'material-ui/svg-icons/action/reorder';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';

import ObjectInput from './components/ObjectInput';
import ObjectList from './components/ObjectList';
import UserInput from './components/UserInput';

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
        <MenuItem
          primaryText="Log In"
          onClick={this.props.onSesionChange.bind(this)}
        />
      </IconMenu>
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

  loginButton(){
    return (
      <div>
        <AppBar
          title={this.state.user && this.state.user.displayName}
          iconElementLeft={
            this.state.user?(
              <Avatar src={this.state.user.photoURL} />
            ) : (
              <p>SIROP</p>
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

  userExists() {
    if (this.state.user) {
      this.firebaseService.getUserByUid(
        this.state.user.uid,
        (user) => {this.setState({
          userRegistered: user !== null
        }, () => {
          this.firebaseService.getUserObjects(
            this.state.user.uid,
            (objects) => {this.setState({
              fetchingData: false,
              userObjects: objects
            })}
          )
        })}
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

  handleObjectCreate(){
    if (this.state.objectData) {
      this.firebaseService.setUserObject(
        this.state.user.uid,
        this.state.objectData.uid,
        this.state.objectData
      );
      this.firebaseService.getUserObjects(
        this.state.user.uid,
        (objects) => {this.setState({
          userObjects: objects
        })}
      )
    }
    this.setState({dataInputOpen: false});
  }

  handleObjectChangeCreate(objectData){
    this.setState({
      objectData: objectData,
    }, () => {this.handleObjectCreate()})
  }

  handleObjectDelete(objectUid){
    this.firebaseService.deleteUserObject(
      this.state.user.uid,
      objectUid
    );
  }

  handleObjectChangeModify(objectData){
    if (objectData){
      this.firebaseService.updateUserObject(
        this.state.user.uid,
        objectData.uid,
        objectData
      );
    }
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
      userData: userData,
      userInputOpen: userData === null,
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
                  <ObjectInput
                    onChange={(objectData) => {
                      this.handleObjectChangeCreate(objectData)
                    }}
                    open={this.state.dataInputOpen}
                    user={this.state.user}
                  />
                  <ObjectList
                    objects={this.state.userObjects}
                    user={this.state.user}
                    onModify={(objectData) => {
                      this.handleObjectChangeModify(objectData)
                    }}
                    onDelete={
                      (objectUid) => {this.handleObjectDelete(objectUid)}
                    }
                  />
                </div>
              ):(
                this.state.user && (
                  <UserInput
                    onChange={
                      (userData) => {this.handleUserInputChange(userData)
                    }}
                    open={this.state.userInputOpen}
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
