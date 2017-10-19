import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

import { userLogout } from '../redux/actions';
import logo from '../../img/logo.svg';

class NavigationBar extends Component {

  signOut() {
    this.props.dispatch(userLogout());
    this.props.history.push('/');
  }

  render() {
    const { user } = this.props;

    return (
      <Navbar collapseOnSelect style={{display: user.name ? 'block' : 'none'}}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#"><img alt="logo" src={logo} />Cloud Music Player</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavDropdown
            eventKey={1}
            title={user ?
              <div><img className="navbar-user-icon" src={user.profilePicURL} alt="User logo" />{user.name}</div>
              : ''}
            id="basic-nav-dropdown">
            <MenuItem eventKey={1.1} onClick={this.signOut.bind(this)} >Sign out</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(NavigationBar));
