import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import { Redirect } from "react-router-dom";

const Register = ({ register, setAlert, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <Fragment>
      <form
        className="login-form form-group mt-5"
        onSubmit={(e) => onSubmit(e)}
      >
        <p className="login-text">
          <span className="fa-stack fa-lg">
            <i className="fa fa-circle fa-stack-2x"></i>
            <i className="fa fa-lock fa-stack-1x"></i>
          </span>
        </p>
        <input
          type="text"
          className="login-username"
          autoFocus={true}
          required={true}
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <input
          type="email"
          className="login-username"
          autoFocus={true}
          required={true}
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          className="login-password"
          required={true}
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          className="login-password"
          required={true}
          placeholder="Confirm Password"
          name="password2"
          value={password2}
          onChange={(e) => onChange(e)}
        />
        <input
          type="submit"
          name="Register"
          value="Register"
          className="login-submit mt-4"
        />
      </form>
      <a href="#" className="login-forgot-pass">
        forgot password?
      </a>
      <div className="underlay-photo"></div>
      <div className="underlay-black"></div>{" "}
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
