import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import { useState } from 'react';

const Heading = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [formSearch, setFormSearch] = useState('');

  const onChange = (e) => {
    setFormSearch(e.target.value);
  };

  const onSubmit = () => {
    setFormSearch('');
  };

  const authLinks = (
    <Nav>
      <Link onClick={logout} className="nav-link">
        Logout
      </Link>
    </Nav>
  );

  const guestLinks = (
    <Nav>
      <Link to="/register" className="nav-link">
        Register
      </Link>

      <Link to="/login" className="nav-link">
        Login
      </Link>
    </Nav>
  );

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Link to="/" className="navbar-brand">
        <img
          src="../../../hackers.png"
          width="30"
          height="40"
          alt="Logo"
          class="mr-2"
        />
        Hackers 3.0
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Timeline</Nav.Link>
          <Nav.Link href="/communities">Communities</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form
          inline
          className="mr-3"
          action="/search"
          onSubmit={() => onSubmit()}
        >
          <FormControl
            type="text"
            name="q"
            className="mr-sm-2 my-2"
            placeholder="Search posts..."
            onChange={(e) => onChange(e)}
          />
        </Form>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

Heading.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Heading);
