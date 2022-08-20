import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../actions/auth';


export class UserAccount extends Component {

  render() {
    return (
        <div className="nav-item dropdown ">
          <a
            className="nav-link dropdown-toggle d-inline-block active"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Account
          </a>
          <div className="dropdown-menu">
            <Link to="account" className="nav-link">Account</Link>
            <a className="dropdown-item" href="#">Another action</a>
            <a className="dropdown-item" href="#">Something else here</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Separated link</a>
          </div>
        </div>
    );
  }
}
