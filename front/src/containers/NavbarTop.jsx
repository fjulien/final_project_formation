import React, { Component } from "react";
import { connect } from 'react-redux';
import { editStart } from '../actions';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';

import "./NavbarTop.scss";

class NavbarTop extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { editStartRedux } = this.props;
    return (
      <div className="NavbarTop">
        <Navbar className="navBar" light expand="md">
          <NavbarBrand href="/">
            <Link className="link_navbar" to='/'>
              Cine Wild
          </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink >
                  <button className="button_navbar" type="button" onClick={() => editStartRedux()}>
                    Admin
                </button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link className="link_navbar" to='/new-movie' >
                    Add movie
                </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link className="link_navbar" to='/modal' >
                    Login
                </Link>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mdtp = (dispatch) => bindActionCreators({
  editStartRedux: editStart,
}, dispatch);



export default connect(null, mdtp)(NavbarTop);
