import React from "react";

import Cookies from 'js-cookie'
export function Navbar() {


  const logout = () => {
    Cookies.remove('Session')
    window.location.reload();
  };


  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/dashbord">
          Dashboard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/members"
              >
                Members
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/intructors">
                Instructors
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/rooms">
                Rooms
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/devices">
                Devices
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/squash">
                Squash
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/classes">
                Classes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/users">
                Users
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Reports
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
              
            </li>
            <li className="nav-item">
                <a className="nav-link" onClick={logout}>
                  SignOut
                </a>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}