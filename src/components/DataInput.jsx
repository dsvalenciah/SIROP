import React, { Component } from 'react';

import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import WarningIcon from 'material-ui/svg-icons/alert/warning';


import {
  blueGrey500, blueGrey300, blueGrey400, brown300, blueGrey700
} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import RadioButton from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';

import _ from 'lodash';

import uuidv4 from 'uuid/v4';

import FirebaseService from '../services/firebase';

import RecordSupport from './RecordSupport'

class DataInput extends Component {
  constructor(props) {
    super(props);
    // this.firebase = new FirebaseService();
    this.staticQuestionsPerArea = null;
    /*
    this.firebase.getQuestionsPerArea(
      (qpa) => {this.staticQuestionsPerArea = qpa}
    );
    */

    this.mode = null;

    this.state = {
      name: null,
      uid: null,

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

  handleClose = (response) => {
    /*
    let conditions = _.map(this.state.questions, (area, i) => (
      _.map(area[Object.keys(area)[0]], (q, j) => (
        q.response !== null && q.response !== undefined
      )).indexOf(false) === -1
    ));

    conditions.push(this.state.name.length > 0);

    if (response) {
      // Save other input
      const record = {
        "complete": conditions.indexOf(false) === -1,
        "questions": this.state.questions.slice(),
        "name": this.state.name,
        "uid": this.state.uid,
        "date": this.getCurrentDate(),
        "note": this.state.note,
      };

      if (this.mode === "creator") {
        this.props.onAddRecord(record);
      } else {
        this.props.onModify(record);
      }
      this.uploadNow();
    } else {
      if (this.props.record) {
        this.setState({questions: _.cloneDeep(this.props.record.questions)});
      }
      if (this.mode === "creator") {
        this.props.onAddRecord(null);
      } else {
        this.props.onModify(null);
      }
    }
    */
    this.props.onClose();
  };

  handleNameFieldChange(event) {
    this.setState(
      {name: event.target.value,},
      () => {this.setState(
        {nameFieldError: this.state.name.length === 0?"Este campo es requerido":""}
      )}
    );
  }

  onFileUpload(event, i, area, j, fileInfo){
    let questionTemp = this.state.questions;
    if (questionTemp[i][area][j].files === undefined) {
      questionTemp[i][area][j]["files"] = {};
    }
    let filesLength = Object.keys(questionTemp[i][area][j].files).length;
    questionTemp[i][area][j].files[filesLength] = fileInfo.file.name;
    this.setState({questions: questionTemp, fileInfo: fileInfo});
  }

  uploadNow(){
    /*
    if (this.state.fileInfo){
      this.firebase.setUserRecordFile(
        this.state.fileInfo.userUid,
        this.state.fileInfo.recordUid,
        this.state.fileInfo.question,
        this.state.fileInfo.file
      );
    }
    */
  }


  render() {
    const actions = [
      <RaisedButton
        label="Cancelar"
        onClick={this.handleClose.bind(this, false)}
      />,
      <RaisedButton
        label="Ok"
        onClick={this.handleClose.bind(this, true)}
      />,
    ];

    return (
      <Dialog
        title="Reporte de no conformidad"
        actions={actions}
        modal={false}
        open={this.props.visible}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
        bodyStyle={{background: blueGrey300}}
        titleStyle={{background: blueGrey500}}
        actionsContainerStyle={{background: blueGrey500}}
      >
        <div>
          <TextField
            hintText="Escriba aquí el nombre del reporte"
            floatingLabelText="Nombre"
            fullWidth={true}
            onChange={this.handleNameFieldChange.bind(this)}
            defaultValue={this.state.name}
            errorText={this.state.nameFieldError}
          />
          <Paper
            zDepth={3}
          >
            <div style={{margin: 10, padding: 10}}>
              <p>Cedula</p>
              <p>Fecha registro</p>
              <p>Fecha devolucion</p>
              <p>Estado</p>
              <p>Tipo objeto</p>
            </div>
          </Paper>

          <Paper
            zDepth={3}
          >
            <div style={{margin: 10, padding: 10}}>
              <p>Campus</p>
              <p>Bloque</p>
              <p>Aula</p>
            </div>
          </Paper>

          <Paper
            zDepth={3}
          >
            <div style={{margin: 10, padding: 10}}>
              <p>Telefono</p>
              <p>Direccion</p>
              <p>Correo</p>
            </div>
          </Paper>
        </div>
      </Dialog>
    );
  }
}

export default DataInput;

