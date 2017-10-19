import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';


class SidebarContent extends Component {

  render() {
    return (
      <div className="sidebar-content">
        lollololololollll
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    packages: state.packages
  }
}

export default connect(mapStateToProps)(SidebarContent);
