import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { hideModal } from "../../actions/modal";
import { login } from "../../actions/auth";

const LoginNotification = ({ hideModal, login, modal }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
    hideModal();
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      show={modal.modalType}
      className="text-white"
      centered
    >
      <Modal.Header className="bg-dark border-dark">
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#111111" }}>
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
            type="email"
            className="login-username"
            autofocus="true"
            required="true"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <input
            type="password"
            className="login-password"
            required="true"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <input
            type="submit"
            name="Login"
            value="Login"
            className="login-submit mt-4"
          />
        </form>
        <Link
          to="/register"
          className="login-forgot-pass text-white"
          style={{ textDecorationColor: "white" }}
          onClick={() => hideModal()}
        >
          New to Hackers 3.0 ?
        </Link>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-secondary" onClick={() => hideModal()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

LoginNotification.propTypes = {
  hideModal: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default connect(mapStateToProps, { hideModal, login })(
  LoginNotification
);
