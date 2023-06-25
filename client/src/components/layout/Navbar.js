import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import ContactContext from "../../context/contact/ContactContext";

const Navbar = ({ icon, title }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.name}</li>
      <li>
        <a href="#!" onClick={onLogout}>
          <i className="fas fa-sign-out-alt">
            <span className="hide-sm">Logout</span>
          </i>
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <a href="/login">
          <i className="fas fa-sign-out-alt">
            <span className="hide-sm">Login</span>
          </i>
        </a>
      </li>
      <li>
        <a href="/register">
          <i className="fas fa-sign-out-alt">
            <span className="hide-sm">Register</span>
          </i>
        </a>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} style={{ height: "40px" }}></i> {title}
      </h1>
      <ul>
        <li>
          <Link to="/">
            <i className="fas">Home</i>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <i className="fas">About</i>
          </Link>
        </li>
      </ul>
      <ul>
        {/* <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li> */}

        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
Navbar.defaultProps = {
  title: "Coult",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
