import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { userLogout } from '../redux/actions';

import '../../css/Navbar.css';

class Navbar extends Component {

  signOut() {
    userLogout();
  }

  render() {
    return (
      <div className="Navbar">
        Navbar <br />
        <a onClick={this.signOut.bind(this)} >Sign out</a>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		userLogout
	}, dispatch);
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
