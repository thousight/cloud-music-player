import React from 'react';
import Sidebar from 'react-sidebar';
import MaterialTitlePanel from './material';
import sidebarContent from './sidebarContent';
const mql = window.matchMedia(`(min-width: 800px)`);


const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
  },
  content: {
    padding: '16px',
  },
};

class Side extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      mql: mql,
      docked: props.docked,
      open: props.open
    }

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  onSetOpen(open) {
    this.setState({open: open});
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, docked: mql.matches});
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({mql: mql, docked: this.state.mql.matches});
  }

  toggleOpen(ev) {
    this.setState({open: !this.state.open});

    if (ev) {
      ev.preventDefault();
    }
  }

  render() {
    const content = <p>123456789888888888888888888888</p>;
    const contentHeader = (
      <span>
        {!this.state.docked &&
         <a onClick={this.toggleOpen.bind(this)} href="#" style={styles.contentHeaderMenuLink}>=</a>}
      </span>);
    const sidebarProps = {
      sidebar: content,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen
    };

    return (
      <Sidebar {...sidebarProps}>

      </Sidebar>
    );
  }
};

export default Side;
