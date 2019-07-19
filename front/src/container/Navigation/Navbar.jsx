import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignOut from '../Connection/SignOut';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Navbar.scss'

class CompNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }
  toggleNavbar = () => {
    this.setState( prevState => ({
      collapsed: !prevState.collapsed,
    }));
  }

  render() {
    const { token } = this.props;
    const { collapsed } = this.state
    return (
      <div className="Navbar">
        {token ?
          <Navbar color="faded" light expand="md">
            <NavbarBrand to="/" className="mr-auto">Wild Circus Admin</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} />
            <Collapse isOpen={!collapsed} navbar>
              <Nav navbar className="nav-visitor ml-auto">
                <NavItem>
                  <NavLink tag={Link} to="/admin/artist">Artistes</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/admin/act">Numéros</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/admin/show">Représentations</NavLink>
                </NavItem>
                <NavItem>
                  <SignOut/>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          :
          <Navbar color="faded" light expand="md">
            <NavbarBrand to="/" className="mr-auto">Wild Circus</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} />
            <Collapse isOpen={!collapsed} navbar>
              <Nav navbar className="nav-admin ml-auto">
                <NavItem>
                  <NavLink tag={Link} to="/">Acceuil</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/act">Numéros</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/box-office">Billetterie</NavLink>
                </NavItem>
                <NavItem className="admin">
                  <NavLink tag={Link} to="/signin">Admin</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        }

      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
})


export default connect(mapStateToProps)(CompNavbar)
