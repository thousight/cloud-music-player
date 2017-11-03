import React, { Component } from 'react';

export default class CircularButton extends Component {
  render() {
    return (
      <div className="circular-button"
        onClick={this.props.onClick.bind(this)}
        style={{
          width: this.props.lg ? '50px' : '40px',
          height: this.props.lg ? '50px' : '40px',
          padding: this.props.lg ? '7px' : '6px'
        }}>
        <img alt="icon"
          src={this.props.icon}
          style={{
            width: this.props.lg ? '36px' : '28px',
            height: this.props.lg ? '36px' : '28px'
          }} />
      </div>
    )
  }
}
