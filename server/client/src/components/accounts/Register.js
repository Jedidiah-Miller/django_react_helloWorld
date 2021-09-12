import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/auth';
import { createMessage } from '../../actions/messages';


export class Register extends Component {

  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {}
  };

  validateFormData = (user) => {
    var errors = {};

    Object.keys(user).forEach(field => {
      if (!user[field] || user[field] === '') {
        errors[field] = `please enter a ${field}`;
      }
    });

    if (user.password !== user.confirmPassword) {
      errors['password'] = 'passwords do not match';
      errors['confirmPassword'] = 'passwords do not match';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = this.state;
    const user = { username, email, password, confirmPassword };
    const errors = this.validateFormData(user);

    if (errors) {
      this.setState({errors});
      return;
    }

    this.props.registerUser(user);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {

    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }

    const { username, email, password, confirmPassword, errors } = this.state;

    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
              <span style={{color: "red"}}>{errors.username}</span>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
              <span style={{color: "red"}}>{errors.email}</span>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
              <span style={{color: "red"}}>{errors.password}</span>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                onChange={this.onChange}
                value={confirmPassword}
              />
              <span style={{color: "red"}}>{errors.confirmPassword}</span>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { registerUser })(Register);