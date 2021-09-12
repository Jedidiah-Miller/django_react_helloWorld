import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createLead } from '../../actions/leads';


export class Form extends Component {

  static propTypes = {
    createLead: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.state = this.initialState()
  }

  initialState() {
    return {
      name: '',
      email: '',
      message: '',
      errors: {}
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateLead({name, email, message}) {
    var errors = {};
    if (!name) {
      errors['name'] = 'please provide a name';
    }
    if (!email) {
      errors['email'] = 'please provide an email';
    }
    return Object.keys(errors).length === 0 ? null : errors;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = this.state;
    const lead = { name, email, message };
    const errors = this.validateLead(lead);
    if (errors) {
      this.setState({errors});
      return;
    }
    this.props.createLead(lead);
    // we currently don't get errors in this component
    // back from the server
    if (true) {
      this.setState(this.initialState());
    }
  }

  render() {

    const { name, email, message, errors } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Lead</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
            <span style={{color: "red"}}>{errors.name}</span>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
            />
            <span style={{color: "red"}}>{errors.email}</span>
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              className="form-control"
              type="text"
              name="message"
              onChange={this.onChange}
              value={message}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { createLead })(Form);