import React, { Component } from 'react';
import { logout } from '../../../store/actions/auth';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class Layout extends Component {
  componentDidMount () {
    this.props.onLogout(this.props.history);
  }

  render () {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout()),
  }
};

export default connect(null, mapDispatchToProps)(logout);