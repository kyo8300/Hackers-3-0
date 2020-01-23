import React, { Fragment, useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log('OK');
  };

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

export default Login;
