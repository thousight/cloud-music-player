import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { userLogout } from '../redux/actions';

import '../../css/Navbar.css';

class Navbar extends Component {

  render() {
    return (
      <div className="Navbar">
        navbar
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
