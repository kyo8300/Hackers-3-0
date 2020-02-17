import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import { addLike, removeLike } from '../../actions/post';
import { setAlert } from '../../actions/alert';
import Loading from '../layouts/Loading';

const CommunityPosts = ({
  addLike,
  removeLike,
  setAlert,
  auth: { user, isAuthenticated },
  posts
}) => {
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

  return (
    <Fragment>
      {posts.map(post => (
        <Card bg="dark" text="white" className="mb-2">
          <Card.Header>
            <div class="d-inline user-profile">posted by {post.post.name}</div>
          </Card.Header>
          <Card.Body>
            <Link
              to={`/posts/${post.post._id}`}
              style={{ textDecorationColor: 'white' }}
            >
              <Card.Title className="text-white d-inline">
                {post.post.title}
              </Card.Title>
            </Link>
            <div class="d-inline float-right">
              <button
                onClick={() => authCheck1(post.post._id)}
                class="like-btn d-block"
              >
                {/*  Check user is null or not first, if not, check that user liked a post or not. */}
                {user === null ? (
                  <i class="fas fa-arrow-alt-circle-up arrow-size" />
                ) : post.post.likes.filter(
                    like => like.user.toString() === user._id
                  ).length > 0 ? (
                  <i class="fas fa-arrow-alt-circle-up arrow-size mm" />
                ) : (
                  <i class="fas fa-arrow-alt-circle-up arrow-size" />
                )}
              </button>
              <span class="d-block">
                {post.post.likes.length > 0 ? (
                  <span class="num-size">{post.post.likes.length}</span>
                ) : (
                  <i class="fas fa-circle my-2 round-size ml-2" />
                )}
              </span>
              <button
                onClick={() => authCheck2(post.post._id)}
                class="d-block like-btn mt-1"
              >
                <i class="fas fa-arrow-alt-circle-down arrow-size" />{' '}
              </button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

CommunityPosts.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  setAlert
})(CommunityPosts);
