import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import BlackLoading from '../layouts/blackLoading';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPostsSearch, addLike, removeLike } from '../../actions/post';
import { showModal } from '../../actions/modal';

//無限スクロール
import InfiniteScroll from 'react-infinite-scroll-component';

const PostsSearch = ({
  getPostsSearch,
  post: { posts, hasMore, skip, loading },
  auth: { user, isAuthenticated },
  addLike,
  removeLike,
  showModal,
}) => {
  useEffect(() => {
    getPostsSearch();
  }, []);

  const authCheck1 = (id) => {
    if (!isAuthenticated) {
      showModal();
    } else {
      addLike(id);
    }
  };

  const authCheck2 = (id) => {
    if (!isAuthenticated) {
      showModal();
    } else {
      removeLike(id);
    }
  };

  return !loading && !posts.length ? (
    <Row>
      <Col lg={2}>
        <Card border="primary">Space</Card>
      </Col>
      <Col lg={6}>
        <div className="text-center my-5 ">
          <i class="fas fa-sad-tear sad-icon py-4" /> <br />
          <h5>
            Sorry,there were no results for "
            {window.location.search.substring(3)}
            ".
          </h5>
        </div>
      </Col>
      <Col lg={4}>
        <Card border="primary">Tag</Card>
      </Col>
    </Row>
  ) : (
    <Row>
      <Col lg={2}>
        <Card border="primary">Space</Card>
      </Col>
      <Col lg={6}>
        <InfiniteScroll
          dataLength={posts.length}
          next={() => getPostsSearch(skip)}
          hasMore={hasMore}
          loader={<BlackLoading />}
          endMessage={<div>End!!</div>}
          className="mt-3"
        >
          {posts.map((post) => (
            <Card bg="dark" text="white" className="mb-2" key={post._id}>
              <Card.Header>
                <div>
                  <div class="d-inline">
                    <Link
                      to={`/community/${post.community._id}`}
                      style={{
                        textDecoration: 'none',
                      }}
                      className="text-white"
                    >
                      <img
                        src={`data:image/png;base64,${Buffer.from(
                          post.community.avatar.data
                        ).toString('base64')}`}
                        className="mr-1"
                        width="20px"
                        height="20px"
                        fluid
                      />{' '}
                      {post.community.name}
                    </Link>
                  </div>
                  <div class="d-inline user-profile">
                    ・ posted by{' '}
                    <Link
                      to={`/profile/${post.user}`}
                      style={{
                        textDecorationColor: 'white',
                        color: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      {post.name}
                    </Link>
                  </div>
                </div>
              </Card.Header>
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
                        (like) => like.user.toString() === user._id
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
        </InfiniteScroll>
      </Col>
      <Col lg={4}>
        <Card border="primary">Tag</Card>
      </Col>
    </Row>
  );
};

PostsSearch.propTypes = {
  getPostsSearch: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPostsSearch,
  addLike,
  removeLike,
  showModal,
})(PostsSearch);
