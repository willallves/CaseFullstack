import React, { Component } from 'react';
import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import swal from 'sweetalert';
const axios = require('axios');

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      openClientModal: false,
      openClientEditModal: false,
      id: '',
      name: '',
      birth: '',
      cpf: '',
      rg: '',
      phone: '',
      page: 1,
      search: '',
      clients: [],
      pages: 0,
      loading: false
    };
  }

  componentDidMount = () => {
    this.getClients();
  }

  getClients = () => {
    this.setState({ loading: true });
    axios.get(`http://localhost:8080/backend/api/read.php`, {
    }).then((res) => {
      this.setState({ loading: false, clients: res.data });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.setState({ loading: false, clients: [], pages: 0 },()=>{});
    });
  }

  deleteClient = (id) => {
    axios.post('http://localhost:8080/backend/api/delete.php', {
      id: id
    }, {}).then((res) => {

      swal({
        text: res.data,
        icon: "success",
        type: "success"
      });

      this.setState({ page: 1 }, () => {
        this.pageChange(null, 1);
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getClients();
    });
  }

  logOut = () => {
    this.props.history.push('/');
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => { });
  };

  addClient = () => {
    const file = {
      "name": this.state.name,
      "birth": this.state.birth,
      "cpf": this.state.cpf,
      "rg": this.state.rg,
      "phone": this.state.phone
    };

    axios.post('http://localhost:8080/backend/api/create.php', file, {
    }).then((res) => {
      swal({
        text: res.data,
        icon: "success",
        type: "success"
      });

      this.handleClientClose();
      this.setState({ name: '', birh: '', cpf: '', rg: '', phone: null, page: 1 }, () => {
        this.getClients();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handleClientClose();
    });

  }

  updateClient = () => {
    const file = {
      "id": this.state.id,
      "name": this.state.name,
      "birth": this.state.birth,
      "cpf": this.state.cpf,
      "rg": this.state.rg,
      "phone": this.state.phone
    };

    axios.post('http://localhost:8080/backend/api/update.php', file, {
    }).then((res) => {

      swal({
        text: res.data,
        icon: "success",
        type: "success"
      });

      this.handleClientEditClose();
      this.setState({ name: '', birth: '', cpf: '', rg: '', phone: null }, () => {
        this.getClients();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handleClientEditClose();
    });

  }

  handleClientOpen = () => {
    this.setState({
      openClientModal: true,
      id: '',
      name: '',
      birth: '',
      cpf: '',
      rg: '',
      phone: ''
    });
  };

  handleClientClose = () => {
    this.setState({ openClientModal: false });
  };

  handleClientEditOpen = (data) => {
    this.setState({
      openClientEditModal: true,
      id: data.id,
      name: data.name,
      birth: data.birth,
      cpf: data.cpf,
      rg: data.rg,
      phone: data.phone
    });
  };

  handleClientEditClose = () => {
    this.setState({ openClientEditModal: false });
  };

  render() {
    return (
      <div>
        {this.state.loading && <LinearProgress size={40} />}
        <div>
          <h2>Clients</h2>
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            onClick={this.handleClientOpen}
          >
            Add Client
          </Button>
          <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </Button>
        </div>

        {/* Edit Client */}
        <Dialog
          open={this.state.openClientEditModal}
          onClose={this.handleClientClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit Client</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Client Name"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="birth"
              value={this.state.birth}
              onChange={this.onChange}
              placeholder="Birth"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="cpf"
              value={this.state.cpf}
              onChange={this.onChange}
              placeholder="CPF"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="rg"
              value={this.state.rg}
              onChange={this.onChange}
              placeholder="RG"
              required
            /><br /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="phone"
              value={this.state.phone}
              onChange={this.onChange}
              placeholder="Phone Number"
              required
            /><br /><br />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClientEditClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={this.state.name === '' || this.state.birth === '' || this.state.cpf === '' || this.state.rg === '' || this.state.phone === ''}
              onClick={(e) => this.updateClient()} color="primary" autoFocus>
              Edit Client
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Client */}
        <Dialog
          open={this.state.openClientModal}
          onClose={this.handleClientClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Add Client</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Client Name"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="birth"
              value={this.state.birth}
              onChange={this.onChange}
              placeholder="Birth"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="cpf"
              value={this.state.cpf}
              onChange={this.onChange}
              placeholder="CPF"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="rg"
              value={this.state.rg}
              onChange={this.onChange}
              placeholder="RG"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="phone"
              value={this.state.phone}
              onChange={this.onChange}
              placeholder="Phone"
              required
            /><br /><br />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClientClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={this.state.name === '' || this.state.birth === '' || this.state.cpf === '' || this.state.rg === '' || this.state.phone === ''}
              onClick={(e) => this.addClient()} color="primary" autoFocus>
              Add Client
            </Button>
          </DialogActions>
        </Dialog>

        <br />

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Birth</TableCell>
                <TableCell align="center">CPF</TableCell>
                <TableCell align="center">RG</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.clients.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="center">{row.birth}</TableCell>
                  <TableCell align="center">{row.cpf}</TableCell>
                  <TableCell align="center">{row.rg}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">
                    <Button
                      className="button_style"
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={(e) => this.handleClientEditOpen(row)}
                    >
                      Edit
                  </Button>
                    <Button
                      className="button_style"
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={(e) => this.deleteClient(row.id)}
                    >
                      Delete
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <Pagination count={this.state.pages} page={this.state.page} onChange={this.pageChange} color="primary" />
        </TableContainer>
      </div>
    );
  }
}