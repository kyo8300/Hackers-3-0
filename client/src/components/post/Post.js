import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getPost, addLike, removeLike } from '../../actions/post';
import { setAlert } from '../../actions/alert';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { Card } from 'react-bootstrap';

//Markdown
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/railscasts.css';

import { connect } from 'react-redux';
import Loading from '../layouts/Loading';

marked.setOptions({
  langPrefix: 'hljs language-',
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});

const Post = ({
  getPost,
  addLike,
  removeLike,
  setAlert,
  post: { post, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  const authCheck1 = id => {
    if (!auth.isAuthenticated) {
      setAlert('Please Login first.', 'danger');
    } else {
      addLike(id);
    }
  };

  const authCheck2 = id => {
    if (!auth.isAuthenticated) {
      setAlert('Please Login first.', 'danger');
    } else {
      removeLike(id);
    }
  };

  return loading || post === null ? (
    <Loading />
  ) : (
    <Fragment>
      <Card bg="dark" text="white" className="mb-2">
        <Card.Header>
          Header
          <div className="float-right">
            <button
              onClick={() => authCheck1(post._id)}
              class="like-btn d-block"
            >
              {/*  Check user is null or not first, if not, check that user liked a post or not. */}
              {auth.user === null ? (
                <i class="fas fa-arrow-alt-circle-up arrow-size" />
              ) : post.likes.filter(
                  like => like.user.toString() === auth.user._id
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
        </Card.Header>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <div dangerouslySetInnerHTML={{ __html: marked(post.text) }} />
        </Card.Body>
      </Card>
      <CommentForm postId={post._id} />
      <div className="border-top">
        {post.comments.map(comment => (
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
  setAlert: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getPost,
  addLike,
  removeLike,
  setAlert
})(Post);
