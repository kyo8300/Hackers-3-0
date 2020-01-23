import React, { Fragment, useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      console.log('NO');
    } else {
      console.log('OK');
    }
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
          type="text"
          className="login-username"
          autofocus="true"
          required="true"
          placeholder="Name"
          name="name"
          value={name}
          onChange={e => onChange(e)}
        />
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
          type="password"
          className="login-password"
          required="true"
          placeholder="Confirm Password"
          name="password2"
          value={password2}
          onChange={e => onChange(e)}
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
      <div className="underlay-black"></div>{' '}
    </Fragment>
  );
};

export default Register;
