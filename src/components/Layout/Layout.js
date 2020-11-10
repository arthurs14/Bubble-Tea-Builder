import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: true,
  };

  sideDrawerClosed = () => {
    this.setState({ showSideDrawer: false });
  }

  render() {
    const { showSideDrawer } = this.state;
    return (
      <Aux>
        <Toolbar />
        <SideDrawer open={showSideDrawer} closed={this.sideDrawerClosed} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;