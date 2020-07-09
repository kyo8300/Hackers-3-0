import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { addLike, removeLike } from "../../actions/post";
import { showModal } from "../../actions/modal";
import { getCommunity } from "../../actions/community";
import BlackLoading from "../layouts/blackLoading";

//無限スクロール
import InfiniteScroll from "react-infinite-scroll-component";

const CommunityPosts = ({
  addLike,
  removeLike,
  showModal,
  getCommunity,
  auth: { user, isAuthenticated },
  posts,
  skip,
  hasMore,
  communityid,
}) => {
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

  return (
    <Fragment>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => getCommunity(communityid, skip)}
        hasMore={hasMore}
        loader={<BlackLoading />}
        endMessage={<div>End!!</div>}
        className="mt-3"
      >
        {posts.map((post) => (
          <Card bg="dark" text="white" className="mb-2" key={post._id}>
            <Card.Header>
              <div className="d-inline user-profile">
                posted by{" "}
                <Link
                  to={`/profile/${post.post.user}`}
                  style={{
                    textDecorationColor: "white",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {post.post.name}
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              <Link
                to={`/posts/${post.post._id}`}
                style={{ textDecorationColor: "white" }}
              >
                <Card.Title className="text-white d-inline">
                  {post.post.title}
                </Card.Title>
              </Link>
              <div className="d-inline float-right">
                <button
                  onClick={() => authCheck1(post.post._id)}
                  className="like-btn d-block"
                >
                  {/*  Check user is null or not first, if not, check that user liked a post or not. */}
                  {user === null ? (
                    <i className="fas fa-arrow-alt-circle-up arrow-size" />
                  ) : post.post.likes.filter(
                      (like) => like.user.toString() === user._id
                    ).length > 0 ? (
                    <i className="fas fa-arrow-alt-circle-up arrow-size mm" />
                  ) : (
                    <i className="fas fa-arrow-alt-circle-up arrow-size" />
                  )}
                </button>
                <span className="d-block">
                  {post.post.likes.length > 0 ? (
                    <span className="num-size">{post.post.likes.length}</span>
                  ) : (
                    <i className="fas fa-circle my-2 round-size ml-2" />
                  )}
                </span>
                <button
                  onClick={() => authCheck2(post.post._id)}
                  className="d-block like-btn mt-1"
                >
                  <i className="fas fa-arrow-alt-circle-down arrow-size" />{" "}
                </button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </InfiniteScroll>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

CommunityPosts.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  getCommunity: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  showModal,
  getCommunity,
})(CommunityPosts);
