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


  _render() {
    return (
      <li className="nav-item dropdown">
        <button type="button" className="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static">
          <span className="d-lg-none" aria-hidden="true">Bootstrap</span><span className="visually-hidden">Bootstrap&nbsp;</span> v5.2 <span className="visually-hidden">(switch to other versions)</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li><h6 className="dropdown-header">v5 releases</h6></li>
          <li>
            <a className="dropdown-item current" aria-current="true" href="/">
              Latest (5.2.x)
            </a>
          </li>
          <li>
              <a className="dropdown-item" href="https://getbootstrap.com/docs/5.1/">v5.1.3</a>
          </li>
          <li>
              <a className="dropdown-item" href="https://getbootstrap.com/docs/5.0/">v5.0.2</a>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li><h6 className="dropdown-header">Previous releases</h6></li>
          <li><a className="dropdown-item" href="https://getbootstrap.com/docs/4.6/">v4.6.x</a></li>
          <li><a className="dropdown-item" href="https://getbootstrap.com/docs/3.4/">v3.4.1</a></li>
          <li><a className="dropdown-item" href="https://getbootstrap.com/2.3.2/">v2.3.2</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="/docs/versions/">All versions</a></li>
        </ul>
      </li>
    );
  }

}
