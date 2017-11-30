import React, { Component } from 'react';

import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {
  blueGrey500, blueGrey300, blueGrey400
} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';

import _ from 'lodash';

import uuidv4 from 'uuid/v4';

import FirebaseService from '../services/firebase';

import RecordSupport from './RecordSupport'

class ObjectInput extends Component {
  constructor(props) {
    super(props);
    this.abc = [
      "A","B","C","D","E","F","G","H","I","J","K","L","M",
      "N","O","P","Q","R","S","U","V","W","X","Y","Z"
    ];
    // this.firebase = new FirebaseService();
    this.state = {
      file: null,
      dateDevolution: null,
      objectState: null,
      campus: null,
      block: null,
      object: null,
      classRoom: null,
      phone: null,
      direction: null,
      email: null,
      description: null,
      objectFieldError: null,
      classRoomFieldError: null,
      phoneFieldError: null,
      directionFieldError: null,
      emailFieldError: null,
      descriptionFieldError: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.record !== undefined) {

    } else {

    }
  }

  getCurrentDate() {
    let today = new Date();
    let d = today.getDate();
    let m = today.getMonth()+1;
    let y = today.getFullYear();
    let h = today.getHours();
    let mi = today.getMinutes();
    let s = today.getSeconds();

    d = d<10?'0'+d:d;
    m = m<10?'0'+m:m;
    h = h<10?'0'+h:h;
    mi = mi<10?'0'+mi:mi;
    s = s<10?'0'+s:s;

    return d+'/'+m+'/'+y+' - '+h+':'+mi+':'+s;
  }

  handleFinish(response) {
    let data = {
      block: this.state.block,
      campus: this.state.campus,
      classRoom: this.state.classRoom,
      dateRegistred: this.getCurrentDate(),
      dateDevolution: this.state.dateDevolution,
      direction: this.state.direction,
      object: this.state.object,
      objectState: this.state.objectState,
      phone: this.state.phone,
      description: this.state.description,
      file: this.state.file,
    };
    this.props.onChange(data)
  };

  objectFieldController(text) {
    return "";
  }
  classRoomFieldController(text) {
    return "";
  }
  phoneFieldController(text) {
    return "";
  }
  directionFieldController(text) {
    return "";
  }
  emailFieldController(text) {
    return "";
  }
  descriptionFieldController(text) {
    return "";
  }

  handleObjectFieldChange(event) {
    this.setState(
      {object: event},
      () => {this.setState({
        objectFieldError: this.objectFieldController(this.state.object)
      })}
    )
  }
  handleClassroomFieldChange(event) {
    this.setState(
      {classRoom: event},
      () => {this.setState({
        classRoomFieldError: this.classRoomFieldController(this.state.classRoom)
      })}
    )
  }
  handlePhoneFieldChange(event) {
    this.setState(
      {phone: event},
      () => {this.setState({
        phoneFieldError: this.phoneFieldController(this.state.phone)
      })}
    )
  }
  handleDirectionFieldChange(event) {
    this.setState(
      {direction: event},
      () => {this.setState({
        directionFieldError: this.directionFieldController(this.state.direction)
      })}
    )
  }
  handleEmailFieldChange(event) {
    this.setState(
      {email: event},
      () => {this.setState({
        emailFieldError: this.emailFieldController(this.state.email)
      })}
    )
  }
  handleDescriptionFieldChange(event) {
    this.setState(
      {description: event},
      () => {this.setState({
        descriptionFieldError: this.descriptionFieldController(this.state.email)
      })}
    )
  }

  handleFileChange(file) {
    this.setState({file: file});
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

    return (
      <Dialog
        title="Reporte de no conformidad"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
        bodyStyle={{background: blueGrey300}}
        titleStyle={{background: blueGrey500}}
        actionsContainerStyle={{background: blueGrey500}}
      >
        <div>
          <Paper
            zDepth={3}
            style={{background: blueGrey400}}
          >
            <div style={{margin: 10, padding: 10}}>
              <center><strong><big>Información del objeto</big></strong></center>
              <DatePicker
                onChange={
                  (_, date) => {
                    this.setState({dateDevolution: date})
                  }
                }
                autoOk={true}
                floatingLabelText="Fecha devolución"
              />
              <div style={{display: "flex"}}>
                <p
                  style={{
                    justifyContent: "flex-start",
                  }}
                >Estado del objeto:</p>
                <DropDownMenu
                  value={"SD"}
                  onChange={
                    (event, index, value) => {
                      this.setState({objectState: value})
                  }}
                  style={{
                    justifyContent: "flex-end"
                  }}
                >
                  <MenuItem value={"SD"} primaryText="Sin dueño"/>
                  <MenuItem value={"AR"} primaryText="Archivado"/>
                  <MenuItem value={"ES"} primaryText="En subasta"/>
                  <MenuItem value={"SB"} primaryText="Subastado"/>
                  <MenuItem value={"EN"} primaryText="Entregado,"/>
                  <MenuItem value={"NE"} primaryText="No encontrado,"/>
                  <MenuItem value={"EL"} primaryText="Eliminado"/>
                </DropDownMenu>
              </div>
              <TextField
                hintText="Escriba aquí el tipo de objeto"
                floatingLabelText="Tipo de objeto"
                fullWidth={true}
                errorText={this.state.objectFieldError}
                onChange={this.handleObjectFieldChange.bind(this)}
              />
              <TextField
                hintText="Escriba aquí la descripcion del objeto"
                floatingLabelText="Descripcion del objeto"
                fullWidth={true}
                errorText={this.state.descriptionFieldError}
                onChange={this.handleDescriptionFieldChange.bind(this)}
                multiLine={true}
              />

              <RaisedButton
                containerElement='label'
                fullWidth={true}
                label='Subir soporte'>
                <input
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    width: '100%',
                    opacity: 0,
                  }}
                  type="file"
                  onChange={e => this.handleFileChange(e.target.files[0])}
                />
              </RaisedButton>

            </div>
          </Paper>

          <Paper
            zDepth={3}
            style={{background: blueGrey400}}
          >
            <div
              style={{margin: 10, padding: 10}}>
              <center><strong><big>Información del lugar</big></strong></center>
              <div style={{display: "flex"}}>
                <p
                  style={{
                    justifyContent: "flex-start",
                  }}
                >Campus:</p>
                <DropDownMenu
                  value={"C"}
                  onChange={
                    (event, index, value) => {
                      this.setState({campus: value})
                    }
                  }
                  style={{
                    justifyContent: "flex-end",
                  }}
                >
                  <MenuItem value={"C"} primaryText="Cable"/>
                  <MenuItem value={"P"} primaryText="Palogrande"/>
                  <MenuItem value={"N"} primaryText="Nubia"/>
                </DropDownMenu>
              </div>
              <div style={{display: "flex"}}>
                <p
                  style={{
                    justifyContent: "flex-start",
                  }}
                >Bloque:</p>
                  <DropDownMenu
                    value={"C"}
                    onChange={
                      (event, index, value) => {
                        this.setState({block: value})
                      }
                    }
                      style={{
                        justifyContent: "flex-end",
                      }}
                  >
                    {_.map(this.abc, (letter, i) => (
                      <MenuItem key={i} value={letter} primaryText={letter}/>
                    ))}
                  </DropDownMenu>
              </div>
              <TextField
                hintText="Escriba aquí el tipo de objeto"
                floatingLabelText="Aula"
                fullWidth={true}
                errorText={this.state.classRoomFieldError}
                onChange={this.handleClassroomFieldChange.bind(this)}
              />
            </div>
          </Paper>

          <Paper
            zDepth={3}
            style={{background: blueGrey400}}
          >
            <div style={{margin: 10, padding: 10}}>
              <center><strong><big>Información personal</big></strong></center>
              <TextField
                hintText="Escriba aquí el telefono"
                floatingLabelText="Telefono"
                fullWidth={true}
                defaultValue={this.props.user.phoneNumber}
                errorText={this.state.phoneFieldError}
                onChange={this.handlePhoneFieldChange.bind(this)}
              />
              <TextField
                hintText="Escriba aquí la dirección"
                floatingLabelText="Dirección"
                fullWidth={true}
                errorText={this.state.directionFieldError}
                onChange={this.handleDirectionFieldChange.bind(this)}
              />
              <TextField
                hintText="Escriba aquí el correo"
                floatingLabelText="Correo"
                fullWidth={true}
                defaultValue={this.props.user.email}
                errorText={this.state.emailFieldError}
                onChange={this.handleEmailFieldChange.bind(this)}
              />
            </div>
          </Paper>
        </div>
      </Dialog>
    );
  }
}

export default ObjectInput;

