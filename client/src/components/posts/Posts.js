import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import Loading from '../layouts/Loading';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading || posts === null ? (
    <Loading />
  ) : (
    <Row>
      <Col lg={2}>
        <Card border="primary">Space</Card>
      </Col>
      <Col lg={6}>
        {posts.map(post => (
          <Card bg="dark" text="white" className="mb-2">
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Link
                to={`/posts/${post._id}`}
                style={{ textDecorationColor: 'white' }}
              >
                <Card.Title key={post._id} className="text-white">
                  {post.title}
                </Card.Title>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </Col>
      <Col lg={4}>
        <Card border="primary">Tag</Card>
      </Col>
    </Row>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
