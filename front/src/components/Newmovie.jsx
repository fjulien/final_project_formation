import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { url } from '../actions/fetch';
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

import "./Newmovie.scss";

class Newmovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      visible: false,
      title: '',
      descript: '',
      url: '',
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
      title,
      descript,
      picture,
    } = this.state;
    if (title !== '' && descript !== '' && picture !== '') {
      const dataSend = {
        title,
        descript,
        picture,
      };
      const conf = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSend),
      };
      fetch(`${url}/movies`, conf)
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
      className,
      title,
      descript,
      picture,
    } = this.state;
    return (
      <div className="Newmovie">
        <Modal isOpen={modal} toggle={this.toggle} className={className}>
          <form onSubmit={this.sendNewUser}>
            <ModalHeader toggle={this.toggle}>Sign in</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label htmlFor="title">Title</Label>
                <Input type="text" onChange={this.onChangeForm} value={title} name="title" id="title" placeholder="Social network" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="descript">Descript</Label>
                <Input type="text" onChange={this.onChangeForm} value={descript} name="descript" id="descript" placeholder="Your comment" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="picture">Picture Url</Label>
                <Input type="url" onChange={this.onChangeForm} value={picture} name="picture" id="picture" placeholder="http://localhost:1988" />
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
export default withRouter(Newmovie);

