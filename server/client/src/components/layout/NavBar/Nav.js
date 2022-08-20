import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';
import { UserAccount } from './UserAccount';


export class Header extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  links = () => {
    return [
      {
        displayName: 'Feed',
        path: 'feed'
      },
      {
        displayName: 'Events',
        path: 'events'
      },
    ];
  };



  isAuthenticatedNavLinks = () => {
    return (
      <ul className="navbar-nav flex-row flex-wrap bd-navbar-nav pt-2 py-md-0">
        <span className="navbar-text mr-3">
          <strong>
            { `Welcome: ${user.username}` }
          </strong>
        </span>
        <li className="nav-item col-6 col-md-auto">
          <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm text-light">
            logout
          </button>
        </li>
      </ul>
    );
  };

  navLinks = () => {
    const { isAuthenticated, user } = this.props.auth;

    if (isAuthenticated) {
      return this.isAuthenticatedNavLinks(user);
    }

    return (
      <div>
        <ul className="navbar-nav flex-row flex-wrap bd-navbar-nav pt-2 py-md-0">
          {this.links().map((link, i) =>
            <li key={i} className="nav-item col-6 col-md-auto dropdown">
              <Link to={link.path} className="nav-link">{link.displayName}</Link>
            </li>
          )}
        </ul>
        <UserAccount />
      </div>
    );
  }

  render() {

    return (
      <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#"> News App</a>
            {this.navLinks()}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);