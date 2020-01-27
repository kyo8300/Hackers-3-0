import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Posts = () => {
  return (
    <Row>
      <Col lg={2}>
        <Card border="primary">Space</Card>
      </Col>
      <Col lg={6}>
        <Card border="primary">Post</Card>
      </Col>
      <Col lg={4}>
        <Card border="primary">Tag</Card>
      </Col>
    </Row>
  );
};

export default Posts;

/*
Posts.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Posts);
*/
