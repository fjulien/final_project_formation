import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import "./ModalConf.scss";

class ModalConf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };
  }

  render() {
    const { history } = this.props;
    const {
      modal,
      className,
    } = this.state;
    return (
      <div className="ModalConf">
        <Modal isOpen={modal} toggle={this.toggle} className={className}>
            <ModalBody>
              Your change is send.
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={() => history.goBack()}>ok</Button>
            </ModalFooter>
        </Modal>
      </div >
    );
  }
}
export default withRouter(ModalConf);
