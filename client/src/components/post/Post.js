import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getPost, addLike, removeLike, deletePost } from "../../actions/post";
import { showModal } from "../../actions/modal";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";
import Moment from "react-moment";
import { Card, Button } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";

//Markdown
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/railscasts.css";

import { connect } from "react-redux";
import Loading from "../layouts/Loading";
import { Link } from "react-router-dom";

marked.setOptions({
  langPrefix: "hljs language-",
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
});

const Post = ({
  getPost,
  addLike,
  removeLike,
  deletePost,
  showModal,
  post: { post, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  const authCheck1 = (id) => {
    if (!auth.isAuthenticated) {
      showModal();
    } else {
      addLike(id);
    }
  };

  const authCheck2 = (id) => {
    if (!auth.isAuthenticated) {
      showModal();
    } else {
      removeLike(id);
    }
  };

  const history = useHistory();

  return loading || post === null ? (
    <Loading />
  ) : (
    <Fragment>
      <Card bg="dark" text="white" className="mb-2">
        <Card.Header>
          <div class="d-inline-block">
            <div class="post-info">
              <img
                src={`data:image/png;base64,${Buffer.from(
                  post.community.avatar.data
                ).toString("base64")}`}
                className="mr-1"
                width="30px"
                height="30px"
                fluid
              />{" "}
              {post.community.name}
            </div>
            <div class="user-profile mt-2">
              posted by{" "}
              <Link
                to={`/profile/${post.user}`}
                style={{
                  textDecorationColor: "white",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                {post.name}
              </Link>{" "}
              {"・"} <Moment format="YYYY/MM/DD HH:mm">{post.date}</Moment>
            </div>
            {auth.isAuthenticated &&
            !auth.loading &&
            post.user === auth.user._id ? (
              <div>
                {" "}
                <div className="mt-3">
                  <Button
                    variant="outline-secondary mr-1 post-edit-delete-button"
                    size="sm"
                    href={`/edit/${post._id}`}
                  >
                    Edit post
                  </Button>{" "}
                  <Button
                    variant="outline-danger post-edit-delete-button"
                    size="sm"
                    onClick={() =>
                      window.confirm("Are you sure?")
                        ? (deletePost(post._id), history.goBack())
                        : ""
                    }
                  >
                    Delete Post
                  </Button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="float-right d-inline">
            <button
              onClick={() => authCheck1(post._id)}
              class="like-btn d-block"
            >
              {/*  Check user is null or not first, if not, check that user liked a post or not. */}
              {auth.user === null ? (
                <i class="fas fa-arrow-alt-circle-up arrow-size" />
              ) : post.likes.filter(
                  (like) => like.user.toString() === auth.user._id
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
              <i class="fas fa-arrow-alt-circle-down arrow-size" />{" "}
            </button>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <div dangerouslySetInnerHTML={{ __html: marked(post.text) }} />
        </Card.Body>
      </Card>
      <CommentForm postId={post._id} />
      <div className="border-top">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPost,
  addLike,
  removeLike,
  deletePost,
  showModal,
})(Post);
