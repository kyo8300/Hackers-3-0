import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import Loading from '../layouts/Loading';
import { setAlert } from '../../actions/alert';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPosts, addLike, removeLike } from '../../actions/post';

const Posts = ({
  getPosts,
  post: { posts, loading },
  auth: { user, isAuthenticated },
  addLike,
  removeLike,
  setAlert
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const authCheck1 = id => {
    if (!isAuthenticated) {
      setAlert('Please Login first.', 'danger');
    } else {
      addLike(id);
    }
  };

  const authCheck2 = id => {
    if (!isAuthenticated) {
      setAlert('Please Login first.', 'danger');
    } else {
      removeLike(id);
    }
  };

  return loading || posts === null ? (
    <Loading />
  ) : (
    <Row>
      <Col lg={2}>
        <Card border="primary">Space</Card>
      </Col>
      <Col lg={6}>
        {posts.map(post => (
          <Card bg="dark" text="white" className="mb-2" key={post._id}>
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Link
                to={`/posts/${post._id}`}
                style={{ textDecorationColor: 'white' }}
              >
                <Card.Title className="text-white d-inline">
                  {post.title}
                </Card.Title>
              </Link>
              <div class="d-inline float-right">
                <button
                  onClick={() => authCheck1(post._id)}
                  class="like-btn d-block"
                >
                  {/*  Check user is null or not first, if not, check that user liked a post or not. */}
                  {user === null ? (
                    <i class="fas fa-arrow-alt-circle-up arrow-size" />
                  ) : post.likes.filter(
                      like => like.user.toString() === user._id
                    ).length > 0 ? (
                    <i class="fas fa-arrow-alt-circle-up arrow-size mm" />
                  ) : (
                    <i class="fas fa-arrow-alt-circle-up arrow-size" />
                  )}
                </button>
                <span class="d-block">
                  {post.likes.length > 0 ? (
                    <span class="num-size">{post.likes.length}</span>
                  ) : (
                    <i class="fas fa-circle my-2 round-size ml-2" />
                  )}
                </span>
                <button
                  onClick={() => authCheck2(post._id)}
                  class="d-block like-btn mt-1"
                >
                  <i class="fas fa-arrow-alt-circle-down arrow-size" />{' '}
                </button>
              </div>
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
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getPosts,
  addLike,
  removeLike,
  setAlert
})(Posts);
