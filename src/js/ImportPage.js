import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class ImportPage extends Component {

  selectAllButtonOnClick() {
    alert("did something");
  }

  render() {
    return (
      <div className="import-page">
        <h1>Import Page</h1>
        <Button className="select-all-button" onClick={this.selectAllButtonOnClick.bind(this)}>Select All</Button>
      </div>
    );
  }
}

export default ImportPage;
