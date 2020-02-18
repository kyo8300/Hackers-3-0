import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <form className="login-form form-group mt-5" onSubmit={e => onSubmit(e)}>
        <p className="login-text">
          <span className="fa-stack fa-lg">
            <i className="fa fa-circle fa-stack-2x"></i>
            <i className="fa fa-lock fa-stack-1x"></i>
          </span>
        </p>
        <input
          type="email"
          className="login-username"
          autofocus="true"
          required="true"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => onChange(e)}
        />
        <input
          type="password"
          className="login-password"
          required="true"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
        />
        <input
          type="submit"
          name="Login"
          value="Login"
          className="login-submit mt-4"
        />
      </form>
      <a href="#" className="login-forgot-pass">
        forgot password?
      </a>
      <div className="underlay-photo"></div>
      <div className="underlay-black"></div>{' '}
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
