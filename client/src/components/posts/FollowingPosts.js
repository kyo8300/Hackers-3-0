import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Nav } from 'react-bootstrap';
import BlackLoading from '../layouts/blackLoading';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getFollowingPosts,
  initPosts,
  addLike,
  removeLike,
} from '../../actions/post';
import { showModal } from '../../actions/modal';

//無限スクロール
import InfiniteScroll from 'react-infinite-scroll-component';

const FollowingPosts = ({
  getFollowingPosts,
  initPosts,
  post: { posts, hasMore, skip, sort },
  auth: { user, isAuthenticated, loading },
  addLike,
  removeLike,
  showModal,
}) => {
  useEffect(() => {
    initPosts();
    getFollowingPosts(0, 1);
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

  const activeClass1 = sort === 1 ? 'active' : '';
  const activeClass2 = sort === 2 ? 'active' : '';
  const disabled1 = sort === 1 ? 'disabled' : '';
  const disabled2 = sort === 2 ? 'disabled' : '';

  if (!isAuthenticated && !loading) return <Redirect to="/global" />;

  return (
    <Row>
      <Col lg={1}></Col>
      <Col lg={7}>
        <Nav
          className="justify-content-center home-popular-nav mt-1"
          activeKey="/"
        >
          <Nav.Item>
            <Nav.Link href="/">
              <i class="fas fa-home mr-1" />
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/global">
              <i class="fas fa-globe mr-1" />
              Global
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav className="justify-content-center new-hot-nav mt-2" activeKey="/">
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                initPosts();
                getFollowingPosts(0, 1);
              }}
              className={`${activeClass1} ${disabled1}`}
            >
              <i class="fas fa-sun mr-1" />
              New
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-1"
              onClick={() => {
                initPosts();
                getFollowingPosts(0, 2);
              }}
              className={`${activeClass2} ${disabled2}`}
            >
              <i class="fab fa-hotjar mr-1" />
              Hot
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <InfiniteScroll
          dataLength={posts.length}
          next={() => getFollowingPosts(skip, sort)}
          hasMore={hasMore}
          loader={<BlackLoading />}
          endMessage={
            <div className="text-center mt-4">
              <div>
                <i className="fas fa-sad-tear fa-3x mb-3" />
              </div>
              <div className="my-2">There are no more posts to read.</div>
              <div className="my-2">Let's join the community more!</div>
            </div>
          }
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

FollowingPosts.propTypes = {
  getFollowingPosts: PropTypes.func.isRequired,
  initPosts: PropTypes.func.isRequired,
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
  getFollowingPosts,
  initPosts,
  addLike,
  removeLike,
  showModal,
})(FollowingPosts);
