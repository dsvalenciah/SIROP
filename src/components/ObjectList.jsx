import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';

import _ from 'lodash';

import UserObject from './UserObject';

class ObjectList extends Component {
  render () {
    return (
      <div style={{padding: 25}}>
        <Paper zDepth={4}>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn><b><big>Estado</big></b></TableHeaderColumn>
                <TableHeaderColumn><b><big>Fecha y hora</big></b></TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {_.map(this.props.objects, (o, id) => (
                  <UserObject
                    key={id}
                    object={o}
                    user={this.props.user}
                    onModify={this.props.onModify.bind(this)}
                    onDelete={this.props.onDelete.bind(this)}
                  />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default ObjectList;