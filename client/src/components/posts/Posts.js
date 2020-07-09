import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Nav } from "react-bootstrap";
import BlackLoading from "../layouts/blackLoading";
import CommunityLanking from "../community/CommunityLanking";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getPosts, initPosts, addLike, removeLike } from "../../actions/post";
import { showModal } from "../../actions/modal";

//無限スクロール
import InfiniteScroll from "react-infinite-scroll-component";

const Posts = ({
  getPosts,
  initPosts,
  post: { posts, hasMore, skip, sort },
  auth: { user, isAuthenticated },
  addLike,
  removeLike,
  showModal,
}) => {
  useEffect(() => {
    initPosts();
    getPosts(0, 1);
  }, [initPosts, getPosts]);

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

  const activeClass1 = sort === 1 ? "active" : "";
  const activeClass2 = sort === 2 ? "active" : "";
  const disabled1 = sort === 1 ? "disabled" : "";
  const disabled2 = sort === 2 ? "disabled" : "";

  const authLinks = (
    <Nav
      className="justify-content-center home-popular-nav mt-1"
      activeKey="/global"
    >
      <Nav.Item>
        <Nav.Link href="/">
          <i className="fas fa-home mr-1" />
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/global">
          <i className="fas fa-globe mr-1" />
          Global
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );

  const guestLinks = (
    <Nav
      className="justify-content-center home-popular-nav mt-1"
      activeKey="/global"
    >
      <Nav.Item>
        <Nav.Link href="/global">
          <i className="fas fa-globe mr-1" />
          Global
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );

  return (
    <Row>
      <Col lg={2}></Col>
      <Col lg={6}>
        {isAuthenticated ? authLinks : guestLinks}
        <Nav className="justify-content-center new-hot-nav mt-2" activeKey="/">
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                initPosts();
                getPosts(0, 1);
              }}
              className={`${activeClass1} ${disabled1}`}
            >
              <i className="fas fa-sun mr-1" />
              New
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-1"
              onClick={() => {
                initPosts();
                getPosts(0, 2);
              }}
              className={`${activeClass2} ${disabled2}`}
            >
              <i className="fab fa-hotjar mr-1" />
              Hot
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <InfiniteScroll
          dataLength={posts.length}
          next={() => getPosts(skip, sort)}
          hasMore={hasMore}
          loader={<BlackLoading />}
          endMessage={<div>End!!</div>}
        >
          {posts.map((post) => (
            <Card bg="dark" text="white" className="mb-2" key={post._id}>
              <Card.Header>
                <div>
                  <div className="d-inline">
                    <Link
                      to={`/community/${post.community._id}`}
                      style={{
                        textDecoration: "none",
                      }}
                      className="text-white"
                    >
                      <img
                        src={`data:image/png;base64,${Buffer.from(
                          post.community.avatar.data
                        ).toString("base64")}`}
                        className="mr-1"
                        width="20px"
                        height="20px"
                        alt="community-avatar"
                        fluid="true"
                      />{" "}
                      {post.community.name}
                    </Link>
                  </div>
                  <div className="d-inline user-profile">
                    ・ posted by{" "}
                    <Link
                      to={`/profile/${post.user}`}
                      style={{
                        textDecorationColor: "white",
                        color: "rgba(255, 255, 255, 0.5)",
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
                  style={{ textDecorationColor: "white" }}
                >
                  <Card.Title className="text-white d-inline">
                    {post.title}
                  </Card.Title>
                </Link>
                <div className="d-inline float-right">
                  <button
                    onClick={() => authCheck1(post._id)}
                    className="like-btn d-block"
                  >
                    {/*  Check user is null or not first, if not, check that user liked a post or not. */}
                    {user === null ? (
                      <i className="fas fa-arrow-alt-circle-up arrow-size" />
                    ) : post.likes.filter(
                        (like) => like.user.toString() === user._id
                      ).length > 0 ? (
                      <i className="fas fa-arrow-alt-circle-up arrow-size mm" />
                    ) : (
                      <i className="fas fa-arrow-alt-circle-up arrow-size" />
                    )}
                  </button>
                  <span className="d-block">
                    {post.likes.length > 0 ? (
                      <span className="num-size">{post.likes.length}</span>
                    ) : (
                      <i className="fas fa-circle my-2 round-size ml-2" />
                    )}
                  </span>
                  <button
                    onClick={() => authCheck2(post._id)}
                    className="d-block like-btn mt-1"
                  >
                    <i className="fas fa-arrow-alt-circle-down arrow-size" />{" "}
                  </button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </InfiniteScroll>
      </Col>
      <Col lg={4} className="my-5">
        <CommunityLanking />
      </Col>
    </Row>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
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
  getPosts,
  initPosts,
  addLike,
  removeLike,
  showModal,
})(Posts);
