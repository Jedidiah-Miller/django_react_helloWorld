import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export class Alerts extends Component {

  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, message, alert } = this.props;
    if (error !== prevProps.error && error.status !== 401) {
      const keys = Object.keys(error.msg);
      keys.forEach(key => alert.error(`${key}: ${error.msg[key]}`));
    }
    if (message !== prevProps.message) {
      const keys = Object.keys(message);
      keys.forEach(key => alert.success(`${message[key]}`));
    }
  }

  render() {
    return <Fragment />;
  }
}


const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));