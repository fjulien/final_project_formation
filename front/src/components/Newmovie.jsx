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
  FormText,
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
      imageFile: null,
    };
    this.toggle = this.toggle.bind(this);
    this.sendNewUser = this.sendNewUser.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.handleselectedFile = this.handleselectedFile.bind(this);
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
      imageFile,
    } = this.state;
    if (title !== '' && descript !== '' && picture !== '') {
      const formData = new FormData();
      formData.append('file', imageFile);
      const dataSend = {
        imageFileName: imageFile.name,
        title,
        descript,
        picture,
      };
      const confFile = {
        method: 'POST',
        body: formData
      };
      const conf = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSend)
      };
      fetch(`${url}/movies/upload`, confFile)
      .then(()=>{
        fetch(`${url}/movies/`, conf)
      })
        .then(() => this.toggle())
        .catch(() => this.onDismiss());
    } else {
      this.onDismiss()
    }
  }

  handleselectedFile(event) {
    this.setState({
      imageFile: event.target.files[0],
    })
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
              <FormGroup>
                <Label for="exampleFile">Image</Label>
                <Input action="uploaddufichier" enctype="multipart/form-data" type="file" name="imageFile" id="imageFile" onChange={this.handleselectedFile} />
                <FormText color="muted">
                  Picture for your movie.
                </FormText>
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

