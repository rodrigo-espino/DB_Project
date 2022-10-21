import React from "react";

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
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
              <a className="nav-link" href="/instructors">
                Instructors
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Rooms
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Devices
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Squash
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Classes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
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
              <li className="nav-item">
                <a className="nav-link" href="#">
                  SignOut
                </a>
              </li>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
