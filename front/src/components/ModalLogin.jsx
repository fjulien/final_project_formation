import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { url } from '../constants';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Alert,
} from 'reactstrap';

import "./ModalLogin.scss";

class ModalLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      visible: false,
    };
    this.toggle = this.toggle.bind(this);
    this.sendNewUser = this.sendNewUser.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onChangeForm(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  toggle() {
    const { history } = this.props;
    history.goBack();
  }

  onDismiss() {
    this.setState(prevState => ({ visible: !prevState.visible }));
  }

  sendNewUser(event) {
    event.preventDefault();
    const {
      email,
      first_name,
      last_name,
      password,
    } = this.state;
    if (email !== '' && first_name !== '' && last_name !== '' && password !== '') {
      const dataSend = {
        email,
        first_name,
        last_name,
        password,
      };
      const conf = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSend),
      };
      fetch(`${url}/login`, conf)
        .then(() => this.toggle())
        .catch(() => this.onDismiss());
    } else {
      this.onDismiss()
    }
  }

  render() {
    const { history } = this.props;
    const {
      visible,
      modal,
      email,
      first_name,
      last_name,
      password,
      className,
    } = this.state;
    return (
      <div className="Modal">
        <Modal isOpen={modal} toggle={this.toggle} className={className}>
          <form onSubmit={this.sendNewUser}>
            <ModalHeader toggle={this.toggle}>Sign in</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input type="email" onChange={this.onChangeForm} value={email} name="email" id="email" placeholder="Clint.Eastwood@example.com" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="first_name">First name</Label>
                <Input type="text" onChange={this.onChangeForm} value={first_name} name="first_name" id="first_name" placeholder="Eastwood" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="last_name">Last name</Label>
                <Input type="text" onChange={this.onChangeForm} value={last_name} name="last_name" id="last_name" placeholder="Clint" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" onChange={this.onChangeForm} value={password} name="password" id="password" placeholder="Your secret password" />
              </FormGroup>
            </ModalBody>
            <Alert color="danger" isOpen={visible} toggle={this.onDismiss}>
              Formuaire is emply !
      </Alert>
            <ModalFooter>
              <Button color="secondary" onClick={() => history.goBack()}>Back</Button>
              <Button color="primary" type="submit" >Send</Button>
            </ModalFooter>
          </form>
        </Modal>
      </div >
    );
  }
}
export default withRouter(ModalLogin);
